import * as PIXI from 'pixi.js';

let type = 'WebGL';
if (!PIXI.utils.isWebGLSupported()) type = 'canvas';
PIXI.utils.sayHello(type);

const snake = new PIXI.Application({ width: 256, height: 256 });

export default snake;
