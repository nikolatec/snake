import IEntity from '../../../gamekit/src/Core/Interfaces/IEntity';
import IPosition from '../../../gamekit/src/Core/Interfaces/IPosition';
import Entity from '../../../gamekit/src/Core/Entity';
import Scene from '../../../gamekit/src/Core/Scene';
import config from '../Config';
import Events from '../../../gamekit/src/Core/Events';
import Apple from './Apple';

export default class Snake extends Entity {

  private target: Apple;
  private ai = false;
  private tailMin = 5;
  private tailLength = 5;
  trail: IPosition[] = [];

  constructor({id, color, x, y, ai = false} : IEntity & {ai?: boolean}) {

    super({id, color, x, y});
    this.ai = ai;
    this.addLengthOnAppleCollision();
  }

  public update() {

    this.cutTailOnSelfCollision();
    this.controlTailLength();
    this.teleportOnWallCollision();
    if (this.ai) {
      this.playAi();
    }
    this.movePlayer();
  }

  private playAi() {
    this.xVelocity = 0;
    this.yVelocity = 0;

    if (!this.target) {

      Math.random() < 0.5
        ? this.target = this.findRandomAppleToEat()
        : this.target = this.findClosesAppleToEat();
    }

    if (this.x < this.target.x) {
      
      this.xVelocity = 1;
    }
    else if (this.x > this.target.x) {
      
      this.xVelocity = -1
    }
    else {
      if (this.y < this.target.y) {
        
        this.yVelocity = 1;
      }
      if (this.y > this.target.y) {
        
        this.yVelocity = -1;
      }
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

      return Math.sqrt(Math.pow(x2 - x1, 2) +  Math.pow(y2 - y1, 2) * 1.0); 
  }

  public draw(scene: Scene) {

    this.makeItGlow(scene);
    this.drawSnake(scene);
  }

  private makeItGlow(scene: Scene) {

    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
  }

  private drawSnake(scene: Scene) {

    for (var i = 0; i < this.trail.length; i++) {
      scene.context.fillStyle = this.color;
      scene.context.fillRect(this.trail[i].x * config.PIXEL, this.trail[i].y * config.PIXEL, config.PIXEL - 2, config.PIXEL - 2);
    }
  }

  private movePlayer() {

    this.x += this.xVelocity;
    this.y += this.yVelocity;
  }

  private cutTailOnSelfCollision() {

    for (var i = 0; i < this.trail.length; i++) {
      if (this.trail[i].x === this.x && this.trail[i].y === this.y) {
        this.tailLength = this.tailMin;
      }
    }
  }

  private controlTailLength() {

    this.trail.push({x: this.x, y: this.y});
    while (this.trail.length > this.tailLength) {
      this.trail.shift();
    }
  }

  private addLengthOnAppleCollision() {

    Events.on('collision', () => {
      this.target = null;
      this.tailLength++;
    });
  }

  private teleportOnWallCollision() {

    if (this.x < 0) {
      this.x = config.SCENE_PIXEL_TIMES_WIDTH - 1;
    }
    if (this.x > config.SCENE_PIXEL_TIMES_WIDTH - 1) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = config.SCENE_PIXEL_TIMES_HEIGHT - 1;
    }
    if (this.y > config.SCENE_PIXEL_TIMES_HEIGHT - 1) {
      this.y = 0;
    }
  }
}