import Scene from '../../../gamekit/src/Core/Scene';
import Entity from '../../../gamekit/src/Core/Entity';
import IEntity from '../../../gamekit/src/Core/Interfaces/IEntity';
import config from '../Config';
import Snake from './Snake';
import Events from '../../../gamekit/src/Core/Events';

export default class Apple extends Entity {

  constructor({id, color, x, y} : IEntity) {

    super({id, color, x, y});
  }

  public update() {

    const snakes: any = this.getEntitiesById('snake');
    for (let snake of snakes) {
      for (var i = 0; i < snake.trail.length; i++) {
        if (snake.trail[i].x === this.x && snake.trail[i].y === this.y) {
          Events.trigger('collision');
          // console.log('collision');
          this.setNewRandomPosition();
        }
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