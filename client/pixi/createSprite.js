import { BaseTexture, Texture } from '@pixi/core';
import { Rectangle } from '@pixi/math';
import { AnimatedSprite } from '@pixi/sprite-animated';
import { app, loader, SnakePosition } from './app';

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

  const sprite = new AnimatedSprite(frames);
  sprite.anchor.set(0.5);
  sprite.animationSpeed = 0.1;
  return sprite;
};

export const createFood = () => ({
  sprite: createSprite('food'),
  move(x, y) {
    let newX = x || Math.ceil(Math.random() * 19) * 40,
      newY = y || Math.ceil(Math.random() * 19) * 40;
    while (SnakePosition.check(newX, newY)) {
      newX = Math.ceil(Math.random() * 19) * 40;
      newY = Math.ceil(Math.random() * 19) * 40;
    }
    console.log(newX, newY);
    this.sprite.x = newX;
    this.sprite.y = newY;
  },
});

export const createHead = () => ({
  rotation: 0,
  food: false,
  get name() {
    let name = 'head';
    if (this.food) name += 'Food';
    return name;
  },
  newSprite() {
    const newSprite = createSprite(this.name);
    replicateSprite(newSprite, this.sprite);
    this.sprite = newSprite;
    return newSprite;
  },
  sprite: createSprite('head'),
});

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
  newSprite() {
    const newSprite = createSprite(this.name);
    replicateSprite(newSprite, this.sprite);
    this.sprite = newSprite;
    return newSprite;
  },
  sprite: createSprite(`${color.toLowerCase()}Body`),
});

export const createTail = (color) => ({
  color,
  rotation: 0,
  get name() {
    return this.color.toLowerCase() + 'Tail';
  },
  newSprite() {
    const newSprite = createSprite(this.name);
    replicateSprite(newSprite, this.sprite);
    this.sprite = newSprite;
    return newSprite;
  },
  sprite: createSprite(`${color.toLowerCase()}Tail`),
});

export const replicateSprite = (newSprite, prevSprite) => {
  const { x, y, animationSpeed, anchor, rotation } = prevSprite;
  newSprite.x = x;
  newSprite.y = y;
  newSprite.animationSpeed = animationSpeed;
  newSprite.anchor = anchor;
  newSprite.rotation = rotation;
  app.stage.removeChild(prevSprite);
  app.stage.addChild(newSprite);
  newSprite.play();
};

export const createSnake = () => ({
  name: 'Tobias',
  head: createHead(),
  body: [createBody('RED'), createBody('BLACK'), createBody('RED')],
  tail: createTail('BLACK'),
});
