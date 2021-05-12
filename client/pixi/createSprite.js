import { BaseTexture, Texture } from '@pixi/core';
import { Rectangle } from '@pixi/math';
import { AnimatedSprite } from '@pixi/sprite-animated';
import { loader } from './app';

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

export const createSnake = () => ({
  name: 'Tobias',
  head: createSprite('head'),
  body: [createSprite('redBody')],
  tail: createSprite('blackTail'),
});
