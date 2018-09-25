import IEntity from '../../../gamekit/src/Core/Interfaces/IEntity';
import IPosition from '../../../gamekit/src/Core/Interfaces/IPosition';
import Entity from '../../../gamekit/src/Core/Entity';
import Scene from '../../../gamekit/src/Core/Scene';
import config from '../Config';
import Events from '../../../gamekit/src/Core/Events';

export default class Snake extends Entity {

  private tailMin = 5;
  private tailLength = 5;
  private trail: IPosition[] = [];

  constructor({id, color, x, y} : IEntity) {

    super({id, color, x, y});
    this.addLengthOnAppleCollision();
  }

  public getTrail() {
    return this.trail;
  }

  public update() {

    this.cutTailOnSelfCollision();
    this.controlTailLength();
    this.teleportOnWallCollision();
    this.movePlayer();
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