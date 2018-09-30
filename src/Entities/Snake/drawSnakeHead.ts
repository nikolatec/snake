import {
  IScene
} from '../../../../gamekit/src/Core/Interfaces';
import {
  Entity,
  Scene,
  AssetLoader
} from '../../../../gamekit/src';
import SnakeSprite from '../../SnakeSprite';

export default function drawSnakeHead(scene: IScene) {

  if (this.velocity.x === 1) {
    this.drawSnakeSprite(
      scene,
      SnakeSprite.headRight,
      {point: this.point},
    );
    return;
  }

  if (this.velocity.x === -1) {
    this.drawSnakeSprite(
      scene,
      SnakeSprite.headLeft,
      {point: this.point},
    );
    return;
  }

  if (this.velocity.y === 1) {
    this.drawSnakeSprite(
      scene,
      SnakeSprite.headDown,
      {point: this.point},
    );
    return;
  }

  if (this.velocity.y === -1) {
    this.drawSnakeSprite(
      scene,
      SnakeSprite.headUp,
      {point: this.point},
    );
  }
}