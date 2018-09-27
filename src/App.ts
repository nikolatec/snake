import Snake from './Entities/Snake';
import Apple from './Entities/Apple';
import Game from '../../gamekit/src/Core/Game';
import Key from '../../gamekit/src/Core/Key';
import config from './Config';
import GenerateApples from './GenerateApples';
import GenerateSnakes from './GenerateSnakes';
import './Styles/index.css';
import * as snake from '../assets/snake.png';
import AssetLoader from '../../gamekit/src/Core/AssetLoader';

// Create the image object
AssetLoader.loadImages([snake]);

GenerateApples(config.APPLES);
GenerateSnakes(config.SNAKES);

let game = Game.createGame({
  fps: config.FPS,
  showFps: true,
  width: config.SCENE_WIDTH,
  height: config.SCENE_HEIGHT,
});

let playerSnake = new Snake({
  id: 'snake',
  color: 'lime',
  x: 10,
  y: 10
});

function handleKeyboard(event: any) {

  playerSnake.xVelocity = 0;
  playerSnake.yVelocity = 0;

  switch (event.keyCode) {

    case Key.LEFT:
      playerSnake.xVelocity = -1;
      break;

    case Key.UP:
      playerSnake.yVelocity = -1;
      break;

    case Key.RIGHT:
      playerSnake.xVelocity = 1;
      break;

    case Key.DOWN:
      playerSnake.yVelocity = 1;
      break;
  }
}

document.addEventListener('keydown', handleKeyboard);

window.onload = game.run;