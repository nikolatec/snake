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
import Snake from './Snake';
import AppleSprite from '../AppleSprite';

export default class Apple extends Entity {

  constructor({id, color, x, y} : IEntity) {

    super({id, color, x, y});
  }

  public update() {

    // for now it is handled in snake
    // this.checkIsAppleEatenByHead();
  }

  private checkIsAppleEatenByHead() {

    const snakes: Snake[] = this.getEntitiesById('snake');
    for (let snake of snakes) {
      if (snake.trail.length) {
        if (snake.trail[0].x === this.x && snake.trail[0].y === this.y) {
          this.setNewRandomPosition();
        }
      }
    }
  }

  private checkIsAppleEatenBySnakeAndTail() {
    
    const snakes: Snake[] = this.getEntitiesById('snake');
    for (let snake of snakes) {
      for (let i = 0; i < snake.trail.length; i++) {
        if (snake.trail[i].x === this.x && snake.trail[i].y === this.y) {
          this.setNewRandomPosition();
        }
      }
    }
  }

  public draw(scene: IScene) {

    // this.makeItGlow(scene);
    this.drawSnakeSprite(scene, AppleSprite.normal, {x: this.x, y: this.y});
    // this.drawDebug(scene);
  }

  private makeItGlow(scene: IScene) {
    
    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
  }

  private drawDebug(scene: IScene) {

    scene.rect({color: this.color, x: this.x * config.PIXEL, y: this.y * config.PIXEL, width: config.PIXEL, height: config.PIXEL});
  }

  private drawSnakeSprite(scene: IScene, segment: IPoint, position: IPoint) {

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

    this.x = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH);
    this.y = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT);
  }
}