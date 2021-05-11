import { Container, Stage } from '@inlet/react-pixi';
import React from 'react';

import Snake from './Snake.jsx';

import { GameContainer } from '../../containers/Game';

const Game = () => {
  return (
    <GameContainer>
      <Stage width={500} height={500} options={{ backgroundColor: 0x000000 }}>
        <Container width={498} height={498}>
          <Snake />
        </Container>
      </Stage>
    </GameContainer>
  );
};

export default Game;
