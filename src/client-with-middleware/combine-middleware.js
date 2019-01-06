const combineMiddleware = (middlewareList = []) => (payload) =>
  middlewareList.reduce((accumulator, middleware) => middleware(accumulator), payload);

export default combineMiddleware;
