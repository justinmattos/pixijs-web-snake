import { app, loader } from './app';
import { createSnake } from './createSprite';

export const setup = () => {
  console.log(loader.resources);
  const player = createSnake();
  const {
    head,
    body: [body1],
    tail,
  } = player;
  head.anchor.set(0.5);
  head.animationSpeed = 0.1;
  head.x = app.view.width / 2;
  head.y = app.view.height / 2;
  app.stage.addChild(head);
  head.play();
  body1.anchor.set(0.5);
  body1.animationSpeed = 0.1;
  body1.x = app.view.width / 2 - 40;
  body1.y = app.view.height / 2;
  app.stage.addChild(body1);
  body1.play();
  tail.anchor.set(0.5);
  tail.animationSpeed = 0.1;
  tail.x = app.view.width / 2 - 80;
  tail.y = app.view.height / 2;
  app.stage.addChild(tail);
  tail.play();
};
