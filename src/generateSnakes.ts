import Snake from './Entities/Snake';
import config from './Config';

export default function generateSnakes(num: number, ai = false) {
  for (let i = 0; i < num; i++) {
    new Snake({
      id: 'snake',
      color: 'lime',
      x: Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH),
      y: Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT),
      ai: true
    });
  }
}