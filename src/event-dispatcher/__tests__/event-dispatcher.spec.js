import EventDispatcher from '../';

describe('EventDispatcher', () => {
  let source;
  let listener;


  beforeEach(() => {
    listener = jest.fn();
    source = new EventDispatcher();
  });

  it('should register and unregister event listeners', () => {
    source.on('test', listener);
    source.emit('test', 'data');
    source.off('test', listener);
    source.emit('test', 'data');

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenLastCalledWith('test', 'data');
  });

  it('should register one time event listener', () => {
    source.once('test', listener);
    source.emit('test');
    source.emit('test');

    expect(listener).toHaveBeenCalledTimes(1);
  });
});
