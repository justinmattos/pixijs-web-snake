import { app, loader } from './pixi/app';
import { setup } from './pixi/setup';

const header = document.createElement('h1');
header.innerHTML = 'Tobias the Snake';
document.querySelector('#main').appendChild(header);
document.querySelector('#main').appendChild(app.view);

loader
  .add([
    { name: 'head', url: './public/images/Head.png' },
    { name: 'headFood', url: './public/images/HeadFood.png' },
    { name: 'blackBody', url: './public/images/BodyBlackStraightThin.png' },
    { name: 'blackElbow', url: './public/images/BodyBlackElbowThin.png' },
    { name: 'blackElbowFood', url: './public/images/BodyBlackElbowFood.png' },
    { name: 'blackFood', url: './public/images/BodyBlackStraightFood.png' },
    { name: 'blackTail', url: './public/images/TailBlack.png' },
    { name: 'redBody', url: './public/images/BodyRedStraightThin.png' },
    { name: 'redElbow', url: './public/images/BodyRedElbowThin.png' },
    { name: 'redElbowFood', url: './public/images/BodyRedElbowFood.png' },
    { name: 'redFood', url: './public/images/BodyRedStraightFood.png' },
    { name: 'redTail', url: './public/images/TailRed.png' },
    { name: 'food', url: './public/images/Food.png' },
  ])
  .load(setup);
