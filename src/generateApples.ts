import {
  Node,
  Point,
} from '../../gamekit/src';
import Apple from './Entities/Apple';
import config from './Config';

export default function GenerateApples(num: number) {
  
  for (let i = 0; i < num; i++) {
    new Apple({
      node: new Node('apple', 'red'),
      point: new Point(Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH), Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT)),
    });
  }
}