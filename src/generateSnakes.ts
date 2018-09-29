import {
  Node,
  Point,
} from '../../gamekit/src';
import Snake from './Entities/Snake';
import config from './Config';

export default function GenerateSnakes(num: number, ai = false) {
  
  for (let i = 0; i < num; i++) {
    new Snake({
      node: new Node('snake', 'lime'),
      point: new Point(Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH), Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT)),
      ai: true
    });
  }
}