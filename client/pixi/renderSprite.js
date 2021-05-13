import { app } from './app';

export const renderSprite = (player) => {
  const { head, body, tail } = player;
  const animSpeed = 0.33;
  head.anchor.set(0.5);
  head.animationSpeed = animSpeed;
  head.x = app.view.width / 2;
  head.y = app.view.height / 2;
  app.stage.addChild(head);
  head.play();
  let offset = 40;
  for (const { sprite } of body) {
    sprite.anchor.set(0.5);
    sprite.animationSpeed = animSpeed;
    sprite.x = app.view.width / 2 - offset;
    sprite.y = app.view.height / 2;
    app.stage.addChild(sprite);
    sprite.play();
    offset += 40;
  }
  tail.anchor.set(0.5);
  tail.animationSpeed = animSpeed;
  tail.x = app.view.width / 2 - offset;
  tail.y = app.view.height / 2;
  app.stage.addChild(tail);
  tail.play();
};
