import { app, loader, SnakePosition } from './app';
import { createSnake, createSprite, createFood } from './createSprite';
import { chainMoves, moveSprite } from './moveSprite';
import { renderSprite } from './renderSprite';

export const setup = () => {
  const player = createSnake();
  renderSprite(player);

  let direction = 'RIGHT';
  let speed = 10;
  let elapsedTime = 0;
  let running = true;

  const food = createFood();
  food.move(440, 40);
  app.stage.addChild(food.sprite);
  food.sprite.play();

  const keysDown = (event) => {
    let eventDirection;
    switch (event.code) {
      case 'ArrowUp':
        eventDirection = 'UP';
        event.preventDefault();
        break;
      case 'ArrowDown':
        eventDirection = 'DOWN';
        event.preventDefault();
        break;
      case 'ArrowLeft':
        eventDirection = 'LEFT';
        event.preventDefault();
        break;
      case 'ArrowRight':
        eventDirection = 'RIGHT';
        event.preventDefault();
        break;
      case 'KeyP':
        running = !running;
        event.preventDefault();
        break;
    }
    if (eventDirection) {
      if (eventDirection !== direction) {
        if (direction === 'UP' && eventDirection !== 'DOWN') {
          direction = eventDirection;
        } else if (direction === 'DOWN' && eventDirection !== 'UP') {
          direction = eventDirection;
        } else if (direction === 'LEFT' && eventDirection !== 'RIGHT') {
          direction = eventDirection;
        } else if (direction === 'RIGHT' && eventDirection !== 'LEFT') {
          direction = eventDirection;
        }
      }
    }
  };

  const keysUp = (event) => {
    console.log(event.code);
    event.preventDefault();
  };

  document.addEventListener('keydown', keysDown);
  document.addEventListener('keyup', keysUp);

  // let maxDelta = 0;
  const gameloop = (delta) => {
    // if (delta >= maxDelta) {
    //   maxDelta = delta;
    //   console.log(maxDelta);
    // }
    elapsedTime++;
    if (running) {
      if (elapsedTime % speed === 0) {
        moveSprite(player, direction, food);
        // if (elapsedTime === 30) {
        //   direction = 'UP';
        // }
        // if (player.head.sprite.y === 40) {
        //   direction = 'LEFT';
        //   if (player.head.sprite.x === 40) {
        //     direction = 'DOWN';
        //   }
        // }
        // if (player.head.sprite.y === 760) {
        //   direction = 'RIGHT';
        //   if (player.head.sprite.x === 760) {
        //     direction = 'UP';
        //   }
        // }
      }
      if (elapsedTime % 60 === 0) {
        console.log(SnakePosition);
      }
    }
  };
  app.ticker.add((delta) => gameloop(delta));
};
