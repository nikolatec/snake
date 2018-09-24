import Scene from './Scene';

class Game {
  fps: number;
  showFps: false;
  previousFrameTime: number;
  scene: any;
  entities: any[];

  constructor({width = 400, height = 400, entities = [], fps = 15, showFps = false} : any) {
    this.run = this.run.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);

    this.fps = fps;
    this.showFps = showFps;
    this.scene = new Scene({width, height});
    this.entities = entities;
  }

  createGame({width = 400, height = 400, fps = 15, showFps = false} : any) {
    this.fps = fps;
    this.showFps = showFps;
    this.scene = new Scene({width, height});
    return this;
  }

  public run() {
    requestAnimationFrame(this.gameLoop);
  }

  private gameLoop(time: number) {
    this.update();
    this.draw(time);
    requestAnimationFrame(this.gameLoop);
  }

  private update() {
    for (let entity of this.entities) {
      entity.update(this.scene);
    }
  }

  private draw(time: number) {
    this.scene.clear();
    this.drawFps(time);
    for (let entity of this.entities) {
      entity.draw(this.scene);
    }
    this.previousFrameTime = time;
  }

  private drawFps(time: number) {
    const fps = Math.floor(1000 / (time - this.previousFrameTime));
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