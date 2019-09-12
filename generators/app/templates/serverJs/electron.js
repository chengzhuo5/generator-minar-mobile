const path = require('path');
require('ts-node').register({
  project:path.join(__dirname, `../tsconfigNode.json`),
  transpileOnly:true,
  typeCheck:false//破编译器太严格了
}); // This will register the TypeScript compiler
require('../server/electron'); // This will load our Typescript application
