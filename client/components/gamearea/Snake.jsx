import React, { useState } from 'react';
import { Sprite, useApp, useTick } from '@inlet/react-pixi';
import { loader } from 'pixi.js';

import snakeHead from '../images/snake-head.svg';

const Snake = () => {
  const app = useApp();
  const [direction, setDirection] = useState({ moveX: 1, moveY: 0 });
  const [motion, setMotion] = useState({
    x: app.screen.width / 2,
    y: app.screen.width / 2,
    rotation: Math.PI / 2,
    anchor: 0.5,
  });
  useTick(() => {
    const { x, y } = motion;
    const { moveX, moveY } = direction;
    setMotion({
      x: x + moveX,
      y: y + moveY,
    });
  });
  // document.addEventListener('keydown', (event) => {
  //   const { code } = event;
  //   if (code === 'ArrowDown') {
  //     setDirection({ moveX: 0, moveY: 1 });
  //   }
  //   if (code === 'ArrowUp') {
  //     setDirection({ moveX: 0, moveY: -1 });
  //   }
  //   if (code === 'ArrowRight') {
  //     setDirection({ moveX: 1, moveY: 0 });
  //   }
  //   if (code === 'ArrowLeft') {
  //     setDirection({ moveX: -1, moveY: 0 });
  //   }
  // });
  return <Sprite image={snakeHead} {...motion} />;
};

export default Snake;
