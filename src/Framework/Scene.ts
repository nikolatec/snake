import ITransform from './Interfaces/ITransform';

export default class Scene {
  canvas: any;
  context: CanvasRenderingContext2D;

  constructor(props?: ITransform) {
    const {width = 400, height = 400} = props;
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width  = width;
    this.canvas.height = height;
  }

  clear() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}