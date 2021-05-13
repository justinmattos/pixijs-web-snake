import { app, loader } from './app';
import { createSnake } from './createSprite';
import { moveSprite } from './moveSprite';
import { renderSprite } from './renderSprite';

export const setup = () => {
  const player = createSnake();
  renderSprite(player);
  setTimeout(() => {
    moveSprite(player, 'RIGHT');
    setTimeout(() => {
      moveSprite(player, 'DOWN');
      setTimeout(() => {
        moveSprite(player, 'RIGHT');
        setTimeout(() => {
          moveSprite(player, 'RIGHT');
          setTimeout(() => {
            moveSprite(player, 'UP');
            setTimeout(() => {
              moveSprite(player, 'LEFT');
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
};
