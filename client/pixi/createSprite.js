import { BaseTexture, Texture } from '@pixi/core';
import { Rectangle } from '@pixi/math';
import { AnimatedSprite } from '@pixi/sprite-animated';
import { app, loader } from './app';

export const createSprite = (name) => {
  const spritesheet = new BaseTexture.from(loader.resources[name].url);
  const w = 40,
    h = 40;

  const frames = [];
  let currW = 0;
  while (currW < spritesheet.realWidth) {
    frames.push(new Texture(spritesheet, new Rectangle(currW, 0, w, h)));
    currW += w;
  }

  return new AnimatedSprite(frames);
};

export const createBody = (color) => ({
  rotation: 0,
  color,
  elbow: false,
  food: false,
  get name() {
    let name = this.color.toLowerCase();
    if (this.elbow || this.food) {
      if (this.elbow) name += 'Elbow';
      if (this.food) name += 'Food';
    } else {
      name += 'Body';
    }
    return name;
  },
  get sprite() {
    const newSprite = createSprite(this.name);
    if (this.prevSprite) {
      const { x, y, animationSpeed, anchor } = this.prevSprite;
      newSprite.x = x;
      newSprite.y = y;
      newSprite.animationSpeed = animationSpeed;
      newSprite.anchor = anchor;
    }
    app.stage.removeChild(this.prevSprite);
    this.prevSprite = newSprite;
    return newSprite;
  },
  prevSprite: null,
});

export const createSnake = () => ({
  name: 'Tobias',
  head: createSprite('head'),
  body: [createBody('RED'), createBody('BLACK'), createBody('RED')],
  tail: createSprite('blackTail'),
});
