const Router = (...args) =>{
  const decorator = (target)=>{
    if(typeof args !== 'object') throw new Error('the argument must be an object');
    target.prototype.routeParams = args[0];
  }
  return decorator;
}
export {Router}
