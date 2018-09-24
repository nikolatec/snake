import IEntity from '../Framework/Interfaces/IEntity';
import IPosition from '../Framework/Interfaces/IPosition';
import Entity from '../Framework/Entity';
import Scene from '../Framework/Scene';
import config from '../Config';

export default class Player extends Entity {
  private tail = 5;
  private tailMin = 5;
  private trail: IPosition[] = [];

  constructor({color, x, y} : IEntity) {
    super({color, x, y});
  }

  public update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.x < 0) {
      this.x = config.SCENE_PIXEL_TIMES_WIDTH - 1;
    }
    if (this.x > config.SCENE_PIXEL_TIMES_WIDTH - 1) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = config.SCENE_PIXEL_TIMES_HEIGHT - 1;
    }
    if (this.y > config.SCENE_PIXEL_TIMES_HEIGHT) {
      this.y = 0;
    }
  }

  public draw(scene: Scene) {
    const apple = this.getEntityById('apple');

    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
    for (var i = 0; i < this.trail.length; i++) {
      scene.context.fillStyle = this.color;
      scene.context.fillRect(this.trail[i].x * config.PIXEL, this.trail[i].y * config.PIXEL, config.PIXEL - 2, config.PIXEL - 2);

      if (this.trail[i].x === apple.x && this.trail[i].y === apple.y) {
        this.tail++;
        apple.x = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH);
        apple.y = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT);
      }

      if (this.trail[i].x === this.x && this.trail[i].y === this.y) {
        this.tail = this.tailMin;
      }
    }

    this.trail.push({x: this.x, y: this.y});

    while (this.trail.length > this.tail) {
      this.trail.shift();
    }
  }
}