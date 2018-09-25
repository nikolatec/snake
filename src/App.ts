import Snake from './Entities/Snake';
import Apple from './Entities/Apple';
import Game from './Framework/Game';
import Key from './Framework/Key';
import config from './Config';

let snake = new Snake({
  id: 'snake',
  color: 'lime',
  x: 5,
  y: 5,
});

let game = Game.createGame({
  fps: 30,
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

function generateApples(num: number) {
  
  for (let i = 0; i < num; i++) {
    new Apple({
      id: 'apple',
      color: 'red',
      x: Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH),
      y: Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT),
    });
  }
}

generateApples(10);

function handleKeyboard(event: any) {

  switch (event.keyCode) {

    case Key.LEFT:
      snake.xVelocity = -1;
      snake.yVelocity = 0;
      break;

    case Key.UP:
      snake.xVelocity = 0;
      snake.yVelocity = -1;
      break;

    case Key.RIGHT:
      snake.xVelocity = 1;
      snake.yVelocity = 0;
      break;

    case Key.DOWN:
      snake.xVelocity = 0;
      snake.yVelocity = 1;
      break;
  }
}

document.addEventListener('keydown', handleKeyboard);

window.onload = game.run;