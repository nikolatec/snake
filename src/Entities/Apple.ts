import Entity from '../Framework/Entity';
import Scene from '../Framework/Scene';
import IEntity from '../Framework/Interfaces/IEntity';
import config from '../Config';

export default class Apple extends Entity {

  constructor({id, color, x, y} : IEntity) {
    super({id, color, x, y});
  }

  public draw(scene: Scene) {
    scene.context.shadowBlur = 20;
    scene.context.shadowColor = this.color;
    scene.context.fillStyle = this.color;
    scene.context.fillRect(this.x * config.PIXEL, this.y * config.PIXEL, config.PIXEL - 2, config.PIXEL - 2);
  }

  public update() {}
}