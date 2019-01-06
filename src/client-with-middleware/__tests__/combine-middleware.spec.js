import combineMiddleware from '../combine-middleware';

describe('combineMiddleware', () => {
  it('should cain middleware in one function', () => {
    const middleware = combineMiddleware([JSON.parse, (a) => a.reverse(), JSON.stringify]);
    const data = middleware('[1,2,3]');
    expect(data).toBe('[3,2,1]');
  });

  it('should not affect data if no middleware was provided', () => {
    const middleware = combineMiddleware();
    const data = middleware([1,2,3]);
    expect(data).toEqual([1,2,3])
  });
});
