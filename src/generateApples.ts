import Apple from './Entities/Apple';
import config from './Config';

export default function generateApples(num: number) {
  
  for (let i = 0; i < num; i++) {
    new Apple({
      id: 'apple',
      color: 'red',
      x: Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH),
      y: Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT),
    });
  }
}