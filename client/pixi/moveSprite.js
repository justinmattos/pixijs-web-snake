import { app, SnakePosition, ticker } from './app';
import { createBody } from './createSprite';

export const chainMoves = (player, arrayOfMoves) => {
  const recursiveFunc = (arrayOfFurtherMoves) => {
    if (arrayOfFurtherMoves.length) {
      setTimeout(() => {
        moveSprite(player, arrayOfFurtherMoves.shift());
        recursiveFunc(arrayOfFurtherMoves);
      }, 1000);
    }
  };
  recursiveFunc(arrayOfMoves);
};

export const moveSprite = (player, direction, food) => {
  const { head, body, tail } = player;
  const {
    sprite: { x, y },
  } = head;
  const route = {
    next: direction,
    nextX: x,
    nextY: y,
    food: false,
  };
  if (player.head.food) {
    route.food = true;
  }
  switch (direction) {
    case 'UP':
      head.sprite.y = y - 40;
      head.sprite.rotation = Math.PI * 1.5;
      break;
    case 'DOWN':
      head.sprite.y = y + 40;
      head.sprite.rotation = Math.PI / 2;
      break;
    case 'LEFT':
      head.sprite.x = x - 40;
      head.sprite.rotation = Math.PI;
      break;
    case 'RIGHT':
      head.sprite.x = x + 40;
      head.sprite.rotation = 0;
      break;
  }
  SnakePosition.remove(tail.sprite.x, tail.sprite.y);
  checkForFood(head, food);
  checkPosition(head);
  shiftBody(body, route, tail);
  SnakePosition.add(head.sprite.x, head.sprite.y);
};

export const checkForFood = (head, food) => {
  const {
    sprite: { x, y },
  } = head;
  if (food.sprite.x === x && food.sprite.y === y) {
    food.move();
    if (!head.food) {
      head.food = true;
      head.newSprite();
    }
  } else {
    if (head.food) {
      head.food = false;
      head.newSprite();
    }
  }
};

export const checkPosition = (head) => {
  if (SnakePosition.check(head.sprite.x, head.sprite.y)) {
    ticker.stop();
  }
  if (head.sprite.x === 0) ticker.stop();
  if (head.sprite.x === 800) ticker.stop();
  if (head.sprite.y === 0) ticker.stop();
  if (head.sprite.y === 800) ticker.stop();
};

export const findPrev = (route, sprite) => {
  const { nextX, nextY } = route;
  const { x: currX, y: currY } = sprite;
  if (currX < nextX) return 'LEFT';
  if (currX > nextX) return 'RIGHT';
  if (currY < nextY) return 'UP';
  if (currY > nextY) return 'DOWN';
};

export const findNext = (route, sprite) => {
  const { nextX, nextY } = route;
  const { x: currX, y: currY } = sprite;
  if (currX < nextX) return 'RIGHT';
  if (currX > nextX) return 'LEFT';
  if (currY < nextY) return 'DOWN';
  if (currY > nextY) return 'UP';
};

export const findRotation = (next, prev) => {
  let elbow, rotation;
  if (next === 'RIGHT') {
    if (prev === 'DOWN') {
      elbow = true;
      rotation = Math.PI / 2;
    }
    if (prev === 'UP') {
      elbow = true;
      rotation = 0;
    }
    if (prev === 'LEFT') {
      elbow = false;
      rotation = 0;
    }
  }
  if (next === 'UP') {
    if (prev === 'RIGHT') {
      elbow = true;
      rotation = 0;
    }
    if (prev === 'LEFT') {
      elbow = true;
      rotation = Math.PI * 1.5;
    }
    if (prev === 'DOWN') {
      elbow = false;
      rotation = Math.PI * 1.5;
    }
  }
  if (next === 'LEFT') {
    if (prev === 'UP') {
      elbow = true;
      rotation = Math.PI * 1.5;
    }
    if (prev === 'DOWN') {
      elbow = true;
      rotation = Math.PI;
    }
    if (prev === 'RIGHT') {
      elbow = false;
      rotation = Math.PI;
    }
  }
  if (next === 'DOWN') {
    if (prev === 'LEFT') {
      elbow = true;
      rotation = Math.PI;
    }
    if (prev === 'RIGHT') {
      elbow = true;
      rotation = Math.PI / 2;
    }
    if (prev === 'UP') {
      elbow = false;
      rotation = Math.PI / 2;
    }
  }
  return { elbow, rotation };
};

export const shiftBody = (body, route, tail) => {
  body[body.length - 1].newSprite();
  for (const segment of body) {
    if (route.food || segment.food) {
      [route.food, segment.food] = [segment.food, route.food];
      segment.newSprite();
    }
    const prev = findPrev(route, segment.sprite);
    const { next } = route;
    const { elbow, rotation } = findRotation(next, prev);
    if (elbow !== segment.elbow) {
      segment.elbow = elbow;
      segment.newSprite();
    }
    const { sprite } = segment;
    sprite.rotation = rotation;
    route.next = findNext(route, sprite);
    [sprite.x, route.nextX] = [route.nextX, sprite.x];
    [sprite.y, route.nextY] = [route.nextY, sprite.y];
  }
  if (route.food) {
    const newBody = createBody(tail.color);
    newBody.food = true;

    const { next } = route;
    const prev = findPrev(route, tail.sprite);
    const { elbow, rotation } = findRotation(next, prev);
    newBody.elbow = elbow;
    newBody.newSprite();

    const { sprite } = newBody;
    sprite.rotation = rotation;
    sprite.x = route.nextX;
    sprite.y = route.nextY;
    body.push(newBody);
    if (tail.color === 'RED') {
      tail.color = 'BLACK';
    } else {
      tail.color = 'RED';
    }
    tail.newSprite();
    newBody.food = false;
  } else {
    switch (route.next) {
      case 'RIGHT':
        tail.sprite.rotation = 0;
        break;
      case 'DOWN':
        tail.sprite.rotation = Math.PI / 2;
        break;
      case 'LEFT':
        tail.sprite.rotation = Math.PI;
        break;
      case 'UP':
        tail.sprite.rotation = Math.PI * 1.5;
        break;
    }
    tail.sprite.x = route.nextX;
    tail.sprite.y = route.nextY;
  }
};
