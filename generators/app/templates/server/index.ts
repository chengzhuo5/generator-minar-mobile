import Koa from 'koa';
import router from './Interface';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import consola from 'consola';
import { Nuxt, Builder } from 'nuxt';
import config from '../nuxt.config';
import path from 'path';
import net from 'net';
import compression  from "koa-compress"

const app = new Koa()

// Import and Set Nuxt.js options
config.dev = !(app.env === 'production')
function portIsOccupied(host, port) {
  return new Promise(resolve => {
    // 创建服务并监听该端口
    var server = net.createServer().listen(port, host)
    server.on('listening', function () { // 执行这块代码说明端口未被占用
      server.close() // 关闭服务
      resolve(true);
    })

    server.on('error', function (err: any) {
      if (err.code === 'EADDRINUSE') { // 端口已经被使用
        resolve(false);
      }
      resolve(false);
    })
  })

}
async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  let {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server
  while (!await portIsOccupied(host, port)) {
    port++;
  }
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(compression());
  app.use(cors());
  app.use(koaBody());
  app.use(router.routes());
  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    const req = ctx.req as any;
    req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start();
export { start }
