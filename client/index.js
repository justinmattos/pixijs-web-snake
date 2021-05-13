import { app, loader } from './pixi/app';
import { setup } from './pixi/setup';

document.querySelector('#main').appendChild(app.view);

loader
  .add([
    { name: 'head', url: './public/images/SnakeHead.png' },
    { name: 'blackBody', url: './public/images/BodyBlackStraightThin.png' },
    { name: 'blackElbow', url: './public/images/BodyBlackElbowThin.png' },
    { name: 'blackTail', url: './public/images/TailBlack.png' },
    { name: 'redBody', url: './public/images/BodyRedStraightThin.png' },
    { name: 'redElbow', url: './public/images/BodyRedElbowThin.png' },
  ])
  .load(setup);
