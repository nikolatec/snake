import Entity from '../Framework/Entity';
import Scene from '../Framework/Scene';
import IEntity from '../Framework/Interfaces/IEntity';
import config from '../Config';
import Snake from './Snake';
import Events from '../Framework/Events';

export default class Apple extends Entity {

  constructor({id, color, x, y} : IEntity) {

    super({id, color, x, y});
  }

  public update() {

    const snake: Snake = this.getEntitiesById('snake')[0];
    for (var i = 0; i < snake.trail.length; i++) {
      if (snake.trail[i].x === this.x && snake.trail[i].y === this.y) {
        Events.trigger('collision');
        this.setNewRandomPosition();
      }
    }
  }

  public draw(scene: Scene) {

    this.makeItGlow(scene);
    this.drawApple(scene);
  }

  private makeItGlow(scene: Scene) {
    
    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
  }

  private drawApple(scene: Scene) {

    scene.context.fillStyle = this.color;
    scene.context.fillRect(this.x * config.PIXEL, this.y * config.PIXEL, config.PIXEL - 2, config.PIXEL - 2);
  }

  private setNewRandomPosition() {

    this.x = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_WIDTH);
    this.y = Math.floor(Math.random() * config.SCENE_PIXEL_TIMES_HEIGHT);
  }
}