import Snake from './Entities/Snake/Snake';
import {
  Node,
  Point,
  Game,
  Key,
  AssetLoader
} from '../../gamekit/src';
import config from './Config';
import GenerateApples from './GenerateApples';
import GenerateSnakes from './GenerateSnakes';
import './Styles/index.css';
import * as snake from '../assets/snake.png';

// Create the image object
AssetLoader.loadImages([snake]);

GenerateApples(config.APPLES);
GenerateSnakes(config.SNAKES);

const game = Game.createGame({
  fps: config.FPS,
  showFps: true,
  width: config.SCENE_WIDTH,
  height: config.SCENE_HEIGHT,
});

const playerSnake = new Snake({
  node: new Node('snake', 'lime'),
  point: new Point(10, 10)
});

function handleKeyboard(event: any) {

  playerSnake.velocity.x = 0;
  playerSnake.velocity.y = 0;

  switch (event.keyCode) {

    case Key.LEFT:
      playerSnake.velocity.x = -1;
      break;

    case Key.UP:
      playerSnake.velocity.y = -1;
      break;

    case Key.RIGHT:
      playerSnake.velocity.x = 1;
      break;

    case Key.DOWN:
      playerSnake.velocity.y = 1;
      break;
  }
}

document.addEventListener('keydown', handleKeyboard);

window.onload = game.run;