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
      this.point,
    );
    return;
  }

  if (this.velocity.x === -1) {
    this.drawSnakeSprite(
      scene,
      SnakeSprite.headLeft,
      this.point,
    );
    return;
  }

  if (this.velocity.y === 1) {
    this.drawSnakeSprite(
      scene,
      SnakeSprite.headDown,
      this.point,
    );
    return;
  }

  if (this.velocity.y === -1) {
    this.drawSnakeSprite(
      scene,
      SnakeSprite.headUp,
      this.point,
    );
    return;
  }
}