import {
  IEntity,
  IPoint,
  IScene
} from '../../../gamekit/src/Core/Interfaces';
import {
  Entity,
  AssetLoader
} from '../../../gamekit/src';
import config from '../Config';
import Snake from './Snake/Snake';
import AppleSprite from '../AppleSprite';

export default class Apple extends Entity {

  constructor({node, point} : IEntity) {

    super({node, point});
  }

  public update() {}

  public draw(scene: IScene) {

    // this.drawDebug(scene);
    this.drawAppleSprite(scene, AppleSprite.normal, this.point);
  }

  private drawDebug(scene: IScene) {

    scene.rect({color: this.node.color, x: this.point.x * config.PIXEL, y: this.point.y * config.PIXEL, width: config.PIXEL, height: config.PIXEL});
  }

  private drawAppleSprite(scene: IScene, segment: IPoint, position: IPoint) {

    scene.sprite({
      image: AssetLoader.loadedImages[0],
      sx: segment.x * AppleSprite.segment,
      sy: segment.y * AppleSprite.segment,
      sWidth: AppleSprite.segment,
      sHeight: AppleSprite.segment,
      dx: position.x * config.PIXEL,
      dy: position.y * config.PIXEL,
      dWidth: config.PIXEL,
      dHeight: config.PIXEL
    });
  }

  public setNewRandomPosition() {

    this.point.x = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH);
    this.point.y = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT);
  }
}