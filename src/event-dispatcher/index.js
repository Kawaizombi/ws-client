class EventDispatcher {
  constructor() {
    this.listeners = {};
  }

  on(event, listener, once = false) {
    if(!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push({ listener, once });
    return this;
  }

  once(event, listener) {
    return this.on(event, listener, true);
  }

  off(event, listener) {
    const listeners = this.listeners[event];
    if(listeners) {
      this.listeners[event] = listeners.filter(({ listener: handler }) => handler !== listener);
    }
  }

  emit(event, ...args) {
    if(this.listeners[event]) {
      this.listeners[event].forEach(({ listener, once }, index) => {
        try {
          if(once) this.listeners[event].splice(index, 1);
          listener(event, ...args);
        } catch(e) {
          console.error('Error occurred in event listener', e);
        }
      });
    }
  }
}

export default EventDispatcher;
