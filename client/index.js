import { app, loader } from './pixi/app';
import { setup } from './pixi/setup';

document.querySelector('#main').appendChild(app.view);

loader
  .add([
    { name: 'head', url: './public/images/SnakeHead.png' },
    { name: 'redBody', url: './public/images/BodyRedStraightThin.png' },
    { name: 'blackTail', url: './public/images/TailBlack.png' },
  ])
  .load(setup);
