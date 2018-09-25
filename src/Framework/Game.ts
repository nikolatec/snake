import Scene from './Scene';

class Game {

  private fps: number = 60;
  private showFps: boolean = false;
  private previousDrawTime: number;
  private scene: any;
  private entites: any = {};

  constructor({width = 400, height = 400} : any) {

    this.run = this.run.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.scene = new Scene({width, height});
  }

  public getEntites() {
    return this.entites;
  }

  public createGame({width = 400, height = 400, fps = 60, showFps = false} : any) {

    this.fps = fps;
    this.showFps = showFps;
    this.scene = new Scene({width, height});
    return this;
  }

  public run() {
    
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop(timestamp: number) {

    // Throttle the frame rate.    
    if (timestamp < this.previousDrawTime + (1000 / this.fps) - 16) {
      requestAnimationFrame(this.gameLoop);
      return;
    }

    this.update();
    this.draw(timestamp);
    requestAnimationFrame(this.gameLoop);
  }

  private update() {

    for (let key in this.entites) {
      for (let entity of this.entites[key]) {
        entity.update(this.scene);
      }
    }
  }

  private draw(timestamp: number) {
    
    this.scene.clear();
    this.showFps && this.drawFps(timestamp);
    this.previousDrawTime = timestamp;
    for (let key in this.entites) {
      for (let entity of this.entites[key]) {
        entity.draw(this.scene);
      }
    }
  }

  private drawFps(timestamp: number) {

    const fps = Math.floor(1000 / (timestamp - this.previousDrawTime));
    this.scene.context.fillStyle = 'white';
    this.scene.context.fillText(fps, this.scene.canvas.width - 17, 10);
  }

  public calculateMousePosition(event: any) {

    const canvasFrame = this.scene.canvas.getBoundingClientRect();
    const root = document.documentElement;
    const x = event.clientX - canvasFrame.left - root.scrollLeft;
    const y = event.clientY - canvasFrame.left - root.scrollTop;
    return { x, y };
  }
}

export default new Game({width: 400, height: 400});