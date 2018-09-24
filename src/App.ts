import Player from './Entities/Player';
import Apple from './Entities/Apple';
import Game from './Framework/Game';
import Key from './Framework/Key';
import config from './Config';

let player = new Player({
  id: 'player',
  color: 'lime',
  x: 5,
  y: 5,
});

let game = Game.createGame({
  fps: 60,
  showFps: true,
  width: config.SCENE_WIDTH,
  height: config.SCENE_HEIGHT,
});

new Apple({
  id: 'apple',
  color: 'red',
  x: config.SCENE_PIXEL_TIMES_WIDTH - 5,
  y: config.SCENE_PIXEL_TIMES_HEIGHT - 5,
});

function handleKeyboard(event: any) {
  switch (event.keyCode) {
    case Key.LEFT:
      player.xVelocity = -1;
      player.yVelocity = 0;
      break;
    case Key.UP:
      player.xVelocity = 0;
      player.yVelocity = -1;
      break;
    case Key.RIGHT:
      player.xVelocity = 1;
      player.yVelocity = 0;
      break;
    case Key.DOWN:
      player.xVelocity = 0;
      player.yVelocity = 1;
      break;
  }
}

document.addEventListener('keydown', handleKeyboard);

window.onload = game.run;