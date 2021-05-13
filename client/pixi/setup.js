import { app, loader } from './app';
import { createSnake } from './createSprite';
import { chainMoves, moveSprite } from './moveSprite';
import { renderSprite } from './renderSprite';

export const setup = () => {
  const player = createSnake();
  renderSprite(player);
  let direction = 'RIGHT';
  let speed = 30;
  let elapsedTime = 0;
  let running = true;
  const gameloop = (delta) => {
    elapsedTime++;
    if (running) {
      if (elapsedTime % speed === 0) {
        moveSprite(player, direction);
        if (elapsedTime === 30) {
          direction = 'UP';
        }
        if (player.head.y === 40) {
          direction = 'LEFT';
          if (player.head.x === 40) {
            direction = 'DOWN';
          }
        }
        if (player.head.y === 760) {
          direction = 'RIGHT';
          if (player.head.x === 760) {
            direction = 'UP';
          }
        }
      }
    }
  };
  app.ticker.add((delta) => gameloop(delta));
};
