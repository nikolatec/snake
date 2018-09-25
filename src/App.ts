import Snake from './Entities/Snake';
import Apple from './Entities/Apple';
import Game from '../../gamekit/src/Core/Game';
import Key from '../../gamekit/src/Core/Key';
import config from './Config';
import generateApples from './generateApples';
import generateSnakes from './generateSnakes';

generateApples(1000);
generateSnakes(10);

let game = Game.createGame({
  fps: 30,
  showFps: true,
  width: config.SCENE_WIDTH,
  height: config.SCENE_HEIGHT,
});

let playerSnake = new Snake({
  id: 'snake',
  color: 'lime',
  x: 5,
  y: 5,
});

function handleKeyboard(event: any) {

  switch (event.keyCode) {

    case Key.LEFT:
      playerSnake.xVelocity = -1;
      playerSnake.yVelocity = 0;
      break;

    case Key.UP:
      playerSnake.xVelocity = 0;
      playerSnake.yVelocity = -1;
      break;

    case Key.RIGHT:
      playerSnake.xVelocity = 1;
      playerSnake.yVelocity = 0;
      break;

    case Key.DOWN:
      playerSnake.xVelocity = 0;
      playerSnake.yVelocity = 1;
      break;
  }
}

document.addEventListener('keydown', handleKeyboard);

window.onload = game.run;