import { app } from './app';

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

export const moveSprite = (player, direction) => {
  const { head, body, tail } = player;
  const { x, y, rotation } = head;
  const route = {
    next: direction,
    nextX: x,
    nextY: y,
    turn: false,
  };
  switch (direction) {
    case 'UP':
      head.y = y - 40;
      head.rotation = Math.PI * 1.5;
      shiftBody(body, route, tail);
      break;
    case 'DOWN':
      head.y = y + 40;
      head.rotation = Math.PI / 2;
      shiftBody(body, route, tail);
      break;
    case 'LEFT':
      head.x = x - 40;
      head.rotation = Math.PI;
      shiftBody(body, route, tail);
      break;
    case 'RIGHT':
      head.x = x + 40;
      head.rotation = 0;
      shiftBody(body, route, tail);
      break;
  }
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

export const shiftBody = (body, route, tail) => {
  for (const segment of body) {
    let { sprite } = segment;
    const prev = findPrev(route, sprite);
    const { next } = route;
    if (
      (next === 'RIGHT' && prev === 'UP') ||
      (next === 'UP' && prev === 'RIGHT')
    ) {
      segment.elbow = true;
      sprite = segment.sprite;
      sprite.rotation = 0;
    } else if (
      (next === 'RIGHT' && prev === 'DOWN') ||
      (next === 'DOWN' && prev === 'RIGHT')
    ) {
      segment.elbow = true;
      sprite = segment.sprite;
      sprite.rotation = Math.PI / 2;
    } else if (
      (next === 'LEFT' && prev === 'DOWN') ||
      (next === 'DOWN' && prev === 'LEFT')
    ) {
      segment.elbow = true;
      sprite = segment.sprite;
      sprite.rotation = Math.PI;
    } else if (
      (next === 'LEFT' && prev === 'UP') ||
      (next === 'UP' && prev === 'LEFT')
    ) {
      segment.elbow = true;
      sprite = segment.sprite;
      sprite.rotation = Math.PI * 1.5;
    } else {
      segment.elbow = false;
      sprite = segment.sprite;
      if (next === 'UP' || next === 'DOWN') {
        sprite.rotation = Math.PI / 2;
      }
    }
    route.next = findNext(route, sprite);
    [sprite.x, route.nextX] = [route.nextX, sprite.x];
    [sprite.y, route.nextY] = [route.nextY, sprite.y];
    app.stage.addChild(sprite);
    sprite.play();
  }
  switch (route.next) {
    case 'RIGHT':
      tail.rotation = 0;
      break;
    case 'DOWN':
      tail.rotation = Math.PI / 2;
      break;
    case 'LEFT':
      tail.rotation = Math.PI;
      break;
    case 'UP':
      tail.rotation = Math.PI * 1.5;
      break;
  }
  tail.x = route.nextX;
  tail.y = route.nextY;
};
