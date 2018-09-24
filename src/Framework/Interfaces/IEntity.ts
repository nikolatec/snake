import IId from './IId';
import IColor from './IColor';
import IPosition from './IPosition';
import ITransform from './ITransform';
import IVelocity from './IVelocity';

export default interface IEntity extends IId, IColor, IPosition, ITransform, IVelocity {};