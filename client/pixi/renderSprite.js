import { app } from './app';

export const renderSprite = (player) => {
  const {
    head: { sprite: head },
    body,
    tail: { sprite: tail },
  } = player;
  head.x = app.view.width / 2;
  head.y = app.view.height / 2;
  app.stage.addChild(head);
  head.play();
  let offset = 40;
  for (const { sprite } of body) {
    sprite.x = app.view.width / 2 - offset;
    sprite.y = app.view.height / 2;
    app.stage.addChild(sprite);
    sprite.play();
    offset += 40;
  }
  tail.x = app.view.width / 2 - offset;
  tail.y = app.view.height / 2;
  app.stage.addChild(tail);
  tail.play();
};
