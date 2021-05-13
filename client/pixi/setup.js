import { app, loader } from './app';
import { createSnake } from './createSprite';
import { chainMoves, moveSprite } from './moveSprite';
import { renderSprite } from './renderSprite';

export const setup = () => {
  const player = createSnake();
  renderSprite(player);
  chainMoves(player, [
    'RIGHT',
    'RIGHT',
    'DOWN',
    'RIGHT',
    'RIGHT',
    'UP',
    'LEFT',
    'LEFT',
    'UP',
    'UP',
    'LEFT',
    'DOWN',
    'DOWN',
    'DOWN',
    'DOWN',
    'DOWN',
    'DOWN',
  ]);
};
