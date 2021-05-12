import { Container, Stage, TilingSprite } from '@inlet/react-pixi';
import React, { useEffect, useState } from 'react';
import { Loader } from 'pixi.js';

import Snake from './Snake.jsx';

import { GameContainer } from '../../containers/Game';

const Game = () => {
  const [loading, setLoading] = useState({ done: false, percent: 0 });
  const sprites = {};
  useEffect(() => {
    const loadProgressHandler = (resource) => {
      console.log(resource);
      const { progressChunk } = resource;
      setLoading({ ...loading, percent: loading.percent + progressChunk });
      // console.log(`Loading: ${resource.url}`);
      // console.log(`Progress: ${currLoader.progressChunk}%`);
      // setLoading({ ...loading, percent: currLoader.progress });
    };
    const loadFinishHandler = (loader, resources) => {
      for (const key in resources) {
        sprites[key] = resources[key].texture;
      }
      setLoading({ ...loading, done: true });
    };
    const loader = new Loader();
    loader
      .use(loadProgressHandler)
      .add([
        {
          name: 'blackElbowFood',
          url: './public/images/BodyBlackElbowFood.json',
        },
        { name: 'blackElbow', url: './public/images/BodyBlackElbowThin.json' },
        {
          name: 'blackFood',
          url: './public/images/BodyBlackStraightFood.json',
        },
        {
          name: 'blackBody',
          url: './public/images/BodyBlackStraightThin.json',
        },
        { name: 'redElbowFood', url: './public/images/BodyRedElbowFood.json' },
        { name: 'redElbow', url: './public/images/BodyRedElbowThin.json' },
        { name: 'redFood', url: './public/images/BodyRedStraightFood.json' },
        { name: 'redBody', url: './public/images/BodyRedStraightThin.json' },
        { name: 'hed', url: './public/images/SnakeHead.json' },
        { name: 'blackTail', url: './public/images/TailBlack.json' },
        { name: 'redTail', url: './public/images/TailRed.json' },
      ])
      .load(loadFinishHandler);
  }, [true]);
  return (
    <GameContainer>
      {loading.done ? (
        <Stage width={500} height={500} options={{ backgroundColor: 0x000000 }}>
          <Container width={498} height={498}>
            <Snake sprites={sprites} />
          </Container>
        </Stage>
      ) : (
        <div>Loading: {loading.percent}%</div>
      )}
    </GameContainer>
  );
};

export default Game;
