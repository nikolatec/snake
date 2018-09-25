import INode from './INode';
import IColor from './IColor';
import IPosition from './IPosition';
import ITransform from './ITransform';
import IVelocity from './IVelocity';
import Scene from '../Scene';
import Entity from '../Entity';

export default interface IEntity extends INode, IColor, IPosition, ITransform, IVelocity {};