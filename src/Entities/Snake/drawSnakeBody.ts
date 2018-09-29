import {
  IScene
} from '../../../../gamekit/src/Core/Interfaces';
import {
  Entity,
  Scene,
  AssetLoader
} from '../../../../gamekit/src';
import SnakeSprite from '../../SnakeSprite';

export default function(scene: IScene) {
  
  for (let i = 1; i < this.trail.length; i++) {

    if (this.trail[i-1].xVelocity === 1 && this.trail[i].xVelocity === 1 || this.trail[i-1].xVelocity === -1 && this.trail[i].xVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyHorizontal, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].yVelocity === 1 && this.trail[i].yVelocity === 1 || this.trail[i-1].yVelocity === -1 && this.trail[i].yVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyVertical, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].x < this.trail[i].x && this.trail[i].yVelocity === 1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleRightDown, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].y < this.trail[i].y && this.trail[i].xVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleDownLeft, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].x > this.trail[i].x && this.trail[i].yVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleLeftUp, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].y > this.trail[i].y && this.trail[i].xVelocity === 1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleUpRight, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].y < this.trail[i].y && this.trail[i].xVelocity === 1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleDownRight, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].x < this.trail[i].x && this.trail[i].yVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleRightUp, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].x > this.trail[i].x && this.trail[i].yVelocity === 1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleLeftDown, this.trail[i]);
      continue;
    }

    if (this.trail[i-1].y > this.trail[i].y && this.trail[i].xVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.bodyAngleUpLeft, this.trail[i]);
      continue;
    }
  }
}