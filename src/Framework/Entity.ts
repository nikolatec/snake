import Game from './Game';
import IEntity from './Interfaces/IEntity';
import Scene from './Scene';

export default abstract class Entity implements IEntity {
  private game = Game;
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
    Game.entities.push(this);
  }

  abstract draw(scene: Scene): void;
  abstract update(scene: Scene): void;

  getEntityById(id: string) {
    return this.game.entities.filter(e => e.id === id)[0];
  }
}