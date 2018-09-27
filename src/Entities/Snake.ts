import IEntity from '../../../gamekit/src/Core/Interfaces/IEntity';
import IPoint from '../../../gamekit/src/Core/Interfaces/IPoint';
import IVelocity from '../../../gamekit/src/Core/Interfaces/IVelocity';
import Entity from '../../../gamekit/src/Core/Entity';
import Scene from '../../../gamekit/src/Core/Scene';
import config from '../Config';
import Apple from './Apple';
import AssetLoader from '../../../gamekit/src/Core/AssetLoader';
import SnakeSprite from '../SnakeSprite';

export default class Snake extends Entity {

  private target: Apple;
  private ai = false;
  private tailMin = 5;
  private tailLength = 5;
  trail: (IPoint & IVelocity)[] = [];

  constructor({id, color, x, y, xVelocity, yVelocity, ai = false, trail = []} : IEntity & {ai?: boolean, trail?: (IPoint & IVelocity)[]}) {

    super({id, color, x, y, xVelocity, yVelocity});
    if (trail[trail.length - 1]) {
      this.x = trail[trail.length - 1].x;
      this.y = trail[trail.length - 1].y;
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

    this.yVelocity = 0;
    this.xVelocity = 0;

    if (!this.target) {

      Math.random() < 0.5
        ? this.target = this.findRandomAppleToEat()
        : this.target = this.findClosesAppleToEat();
    }

    if (this.x < this.target.x) {
      
      this.xVelocity = 1;
      return;
    }

    if (this.x > this.target.x) {

      this.xVelocity = -1
      return;
    }

    if (this.y < this.target.y) {
      
      this.yVelocity = 1;
      return;
    }

    if (this.y > this.target.y) {
      
      this.yVelocity = -1;
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
      const currentDistance = this.findClosestPoint(this.x, this.y, apples[i].x, apples[i].y);
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

  public draw(scene: Scene) {

    // this.makeItGlow(scene);
    // this.drawSnakeDebug(scene);
    this.drawSnake(scene);
  }

  private makeItGlow(scene: Scene) {

    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
  }

  private drawSnake(scene: Scene) {

    this.drawSnakeHead(scene);
    this.drawSnakeBody(scene);
    this.drawSnakeTail(scene);
  }

  private drawSnakeTail(scene: Scene) {

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

  private drawSnakeBody(scene: Scene) {

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

  private drawSnakeHead(scene: Scene) {

    if (this.xVelocity === 1) {
      this.drawSnakeSprite(
        scene,
        SnakeSprite.headRight,
        {x: this.x, y: this.y}
      );
      return;
    }

    if (this.xVelocity === -1) {
      this.drawSnakeSprite(
        scene,
        SnakeSprite.headLeft,
        {x: this.x, y: this.y}
      );
      return;
    }

    if (this.yVelocity === 1) {
      this.drawSnakeSprite(
        scene,
        SnakeSprite.headDown,
        {x: this.x, y: this.y}
      );
      return;
    }

    if (this.yVelocity === -1) {
      this.drawSnakeSprite(
        scene,
        SnakeSprite.headUp,
        {x: this.x, y: this.y}
      );
      return;
    }
  }

  private drawSnakeSprite(scene: Scene, segment: IPoint, point: IPoint) {

    scene.context.drawImage(
      AssetLoader.loadedImages[0],
      segment.x * SnakeSprite.segment,
      segment.y * SnakeSprite.segment,
      SnakeSprite.segment,
      SnakeSprite.segment,
      point.x * config.PIXEL,
      point.y * config.PIXEL,
      config.PIXEL,
      config.PIXEL
    );
  }

  private drawSnakeDebug(scene: Scene) {

    for (let i = 0; i < this.trail.length; i++) {
      scene.context.fillStyle = this.color;
      scene.context.fillRect(this.trail[i].x * config.PIXEL, this.trail[i].y * config.PIXEL, config.PIXEL, config.PIXEL);
    }
  }

  private movePlayer() {

    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  private cutTailOnSelfCollision() {

    for (let i = 0; i < this.trail.length; i++) {
      if (this.trail[i].x === this.x && this.trail[i].y === this.y) {
        this.tailLength = this.tailMin;
      }
    }
  }

  private controlTailLength() {
    
    this.trail.push({
      x: this.x,
      y: this.y,
      xVelocity: this.xVelocity,
      yVelocity: this.yVelocity,
    });
    while (this.trail.length > this.tailLength) {
      this.trail.shift();
    }
  }

  private addLengthOnAppleCollision() {

    const apples: Apple[] = this.getEntitiesById('apple');
    for (let apple of apples) {
      if (this.trail.length) {
        if (this.trail[this.trail.length - 1].x === apple.x && this.trail[this.trail.length - 1].y === apple.y) {
          apple.setNewRandomPosition();
          this.tailLength++;
          return;
        }
      }
    }
  }

  private teleportOnWallCollision() {

    if (this.x < 0) {
      this.x = config.SCENE_PIXEL_TIMES_WIDTH - 1;
      return;
    }

    if (this.x > config.SCENE_PIXEL_TIMES_WIDTH - 1) {
      this.x = 0;
      return;
    }

    if (this.y < 0) {
      this.y = config.SCENE_PIXEL_TIMES_HEIGHT - 1;
      return;
    }

    if (this.y > config.SCENE_PIXEL_TIMES_HEIGHT - 1) {
      this.y = 0;
      return;
    }
  }
}