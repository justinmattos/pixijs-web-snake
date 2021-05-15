import { Application } from 'pixi.js';

export const app = new Application({
  backgroundColor: 0x265d07,
  height: 800,
  width: 800,
});

export const loader = app.loader;

export const ticker = app.ticker;

export const SnakePosition = {
  occupied: new Set(),
  add(x, y) {
    this.occupied.add(JSON.stringify({ x, y }));
  },
  remove(x, y) {
    this.occupied.delete(JSON.stringify({ x, y }));
  },
  check(x, y) {
    return this.occupied.has(JSON.stringify({ x, y }));
  },
};
