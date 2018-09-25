import Game from './Game';
import IEntity from './Interfaces/IEntity';
import Scene from './Scene';

export default abstract class Entity implements IEntity {

  id = '';
  color = 'white';
  x =  0;
  y = 0;
  width = 0;
  height = 0;
  xVelocity = 0;
  yVelocity = 0;
  entites = Game.getEntites();
  
  constructor({id = '', color = 'white', x = 0, y = 0, width = 0, height = 0, xVelocity = 0, yVelocity = 0}) {

    this.id = id;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;

    if (!this.entites[id]) {
      this.entites[id] = [];
    }

    if (!id) {
      id = 'generate uid';
    }

    this.entites[id].push(this);
  }

  abstract draw(scene: Scene): void;
  abstract update(scene: Scene): void;

  public getEntitiesById(id: string) {
    
    return this.entites[id];
  }
}