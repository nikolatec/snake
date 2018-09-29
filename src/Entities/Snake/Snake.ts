import {
  IEntity,
  IPoint,
  IScene
} from '../../../../gamekit/src/Core/Interfaces';
import config from '../../Config';
import Apple from '../Apple';
import {
  Point,
  Velocity,
  Entity,
  AssetLoader
} from '../../../../gamekit/src';
import SnakeSprite from '../../SnakeSprite';
import drawSnakeHead from './drawSnakeHead';
import drawSnakeBody from './drawSnakeBody';
import drawSnakeTail from './drawSnakeTail';

export default class Snake extends Entity {

  private target: Apple;
  private ai = false;
  private tailMin = 5;
  private tailLength = 5;
  private trail: any[] = [];

  constructor({node, point, velocity, ai = false, trail = []} : IEntity & {ai?: boolean, trail?: any[]}) {

    super({node, point, velocity});
    if (trail[trail.length - 1]) {
      this.point.x = trail[trail.length - 1].x;
      this.point.y = trail[trail.length - 1].y;
    }
    this.ai = ai;
    this.trail = trail;
  }

  public update() {

    this.handleAppleCollision();
    this.cutTailOnSelfCollision();
    this.controlTailLength();
    this.teleportOnWallCollision();
    if (this.ai) {
      this.playAi();
    }
    this.trail.push({
      // point: new Point(this.velocity.x, this.velocity.y),
      // velocity: new Velocity(this.velocity.x, this.velocity.y),
      x: this.point.x,
      y: this.point.y,
      xVelocity: this.velocity.x || 0,
      yVelocity: this.velocity.y || 0,
    });
    this.movePlayer();
  }

  private playAi() {

    this.velocity.x = 0;
    this.velocity.y = 0;

    if (!this.target) {

      Math.random() < 0.5
        ? this.target = this.findRandomAppleToEat()
        : this.target = this.findClosesAppleToEat();
    }

    if (this.point.x < this.target.point.x) {
      
      this.velocity.x = 1;
      return;
    }

    if (this.point.x > this.target.point.x) {

      this.velocity.x = -1
      return;
    }

    if (this.point.y < this.target.point.y) {
      
      this.velocity.y = 1;
      return;
    }

    if (this.point.y > this.target.point.y) {
      
      this.velocity.y = -1;
      return;
    }
  }

  private findRandomAppleToEat() {

    const apples =  this.getEntitiesById('apple');
    const rand = Math.floor(Math.random() * apples.length);
    return apples[rand];
  }

  private findClosesAppleToEat() {

    let apple: any;
    let savedDistance = 1000;
    const apples =  this.getEntitiesById('apple');
    for (let i = 0; i < apples.length; i++) {
      const currentDistance = this.findClosestPoint(this.point.x, this.point.y, apples[i].point.x, apples[i].point.y);
      if (currentDistance < savedDistance) {
        savedDistance = currentDistance;
        apple = apples[i];
      }
    }
    return apple;
  }

  private findClosestPoint(x1: number, y1: number, x2: number, y2: number) {

      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) * 1.0); 
  }

  public draw(scene: IScene) {

    // this.drawSnakeDebug(scene);
    this.drawSnake(scene);
  }

  private drawSnake(scene: IScene) {

    this.drawSnakeHead(scene);
    this.drawSnakeBody(scene);
    this.drawSnakeTail(scene);
  }

  private drawSnakeHead = drawSnakeHead;

  private drawSnakeBody = drawSnakeBody;

  private drawSnakeTail = drawSnakeTail;

  private drawSnakeSprite(scene: IScene, segment: IPoint, point: IPoint) {

    scene.sprite({
      image: AssetLoader.loadedImages[0],
      sx: segment.x * SnakeSprite.segment,
      sy: segment.y * SnakeSprite.segment,
      sWidth: SnakeSprite.segment,
      sHeight: SnakeSprite.segment,
      dx: point.x * config.PIXEL,
      dy: point.y * config.PIXEL,
      dWidth: config.PIXEL,
      dHeight: config.PIXEL
    });
  }

  private drawSnakeDebug(scene: IScene) {

    for (let i = 0; i < this.trail.length; i++) {
      scene.rect({
        color: this.node.color,
        x: this.trail[i].x * config.PIXEL,
        y: this.trail[i].y * config.PIXEL,
        width: config.PIXEL,
        height: config.PIXEL
      });
    }
  }

  private movePlayer() {

    this.point.x += this.velocity.x;
    this.point.y += this.velocity.y;
  }

  private cutTailOnSelfCollision() {

    for (let i = 0; i < this.trail.length; i++) {
      if (this.trail[i].x === this.point.x && this.trail[i].y === this.point.y) {
        this.tailLength = this.tailMin;
      }
    }
  }

  private controlTailLength() {
    

    while (this.trail.length > this.tailLength) {
      this.trail.shift();
    }
  }

  private handleAppleCollision() {

    const apples: Apple[] = this.getEntitiesById('apple');
    for (let apple of apples) {
      if (this.trail.length) {
        if (this.point.x === apple.point.x && this.point.y === apple.point.y) {
          apple.setNewRandomPosition();
          this.tailLength++;
          return;
        }
      }
    }
  }

  private teleportOnWallCollision() {

    if (this.point.x < 0) {
      this.point.x = config.SCENE_PIXEL_TIMES_WIDTH - 1;
      return;
    }

    if (this.point.x > config.SCENE_PIXEL_TIMES_WIDTH - 1) {
      this.point.x = 0;
      return;
    }

    if (this.point.y < 0) {
      this.point.y = config.SCENE_PIXEL_TIMES_HEIGHT - 1;
      return;
    }

    if (this.point.y > config.SCENE_PIXEL_TIMES_HEIGHT - 1) {
      this.point.y = 0;
      return;
    }
  }
}