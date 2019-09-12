import Router from 'koa-router';
const router = new Router();
router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name;
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.post('/hello', async (ctx, next) => {
  ctx.response.body = `<h1>Hello, ${ctx.request.body.name}!</h1>`;
});
export default router;
