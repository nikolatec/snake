class Events{

  private events: any = {};

  public on(eventName: string, fn: Function) {

    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  public off(eventName: string, fn: Function) {

    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  }

  public trigger(eventName: string, data?: any) {

    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn: Function) {
          fn(data);
      });
    }
  }
}

export default new Events();