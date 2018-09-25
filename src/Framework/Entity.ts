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
  
  constructor({id = '', color = 'white', x = 0, y = 0, width = 0, height = 0, xVelocity = 0, yVelocity = 0}) {

    this.id = id;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    

    if (!Game.entites[id]) {
      Game.entites[id] = [];
    }

    if (!id) {
      id = 'generate uid';
    }

    Game.entites[id].push(this);
  }

  abstract draw(scene: Scene): void;
  abstract update(scene: Scene): void;

  getEntitiesById(id: string) {
    
    return Game.entites[id];
  }
}