import {
  IEntity,
  IPoint,
  IVelocity,
  IScene
} from '../../../gamekit/src/Core/Interfaces';
import config from '../Config';
import Apple from './Apple';
import {
  Entity,
  Scene,
  AssetLoader
} from '../../../gamekit/src';
import SnakeSprite from '../SnakeSprite';

export default class Snake extends Entity {

  private target: Apple;
  private ai = false;
  private tailMin = 5;
  private tailLength = 5;
  trail: any[] = [];

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

    this.addLengthOnAppleCollision();
    this.cutTailOnSelfCollision();
    this.controlTailLength();
    this.teleportOnWallCollision();
    if (this.ai) {
      this.playAi();
    }
    this.movePlayer();
  }

  private playAi() {

    this.velocity.y = 0;
    this.velocity.x = 0;

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

  private drawSnakeTail(scene: IScene) {

    if (this.trail[0].xVelocity === 1 && this.trail[1].xVelocity === 1) {
      this.drawSnakeSprite(scene, SnakeSprite.tailRight, this.trail[0]);
      return;
    }

    if (this.trail[0].xVelocity === -1 && this.trail[1].xVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.tailLeft, this.trail[0]);
      return;
    }

    if (this.trail[0].yVelocity === 1 && this.trail[1].yVelocity === 1) {
      this.drawSnakeSprite(scene, SnakeSprite.tailDown, this.trail[0]);
      return;
    }

    if (this.trail[0].yVelocity === -1 && this.trail[1].yVelocity === -1) {
      this.drawSnakeSprite(scene, SnakeSprite.tailUp, this.trail[0]);
      return;
    }
  }

  private drawSnakeBody(scene: IScene) {

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

  private drawSnakeHead(scene: IScene) {

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

  private drawSnakeDebug(scene: Scene) {

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
    
    this.trail.push({
      x: this.point.x,
      y: this.point.y,
      xVelocity: this.velocity.x,
      yVelocity: this.velocity.y,
    });
    while (this.trail.length > this.tailLength) {
      this.trail.shift();
    }
  }

  private addLengthOnAppleCollision() {

    const apples: Apple[] = this.getEntitiesById('apple');
    for (let apple of apples) {
      if (this.trail.length) {
        if (this.trail[this.trail.length - 1].x === apple.point.x && this.trail[this.trail.length - 1].y === apple.point.y) {
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