import {
  IScene
} from '../../../../gamekit/src/Core/Interfaces';
import {
  Entity,
  Scene,
  AssetLoader
} from '../../../../gamekit/src';
import SnakeSprite from '../../SnakeSprite';

export default function drawSnakeTail(scene: IScene) {

  if (this.trail.length < 3) {
    return;
  }

  if (this.trail[0].velocity.x === 1 && this.trail[1].velocity.x === 1) {
    this.drawSnakeSprite(scene, SnakeSprite.tailRight, this.trail[0]);
    return;
  }

  if (this.trail[0].velocity.x === -1 && this.trail[1].velocity.x === -1) {
    this.drawSnakeSprite(scene, SnakeSprite.tailLeft, this.trail[0]);
    return;
  }

  if (this.trail[0].velocity.y === 1 && this.trail[1].velocity.y === 1) {
    this.drawSnakeSprite(scene, SnakeSprite.tailDown, this.trail[0]);
    return;
  }

  if (this.trail[0].velocity.y === -1 && this.trail[1].velocity.y === -1) {
    this.drawSnakeSprite(scene, SnakeSprite.tailUp, this.trail[0]);
    return;
  }
}