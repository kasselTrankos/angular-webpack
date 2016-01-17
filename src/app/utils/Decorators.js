const Router = (...args) =>{
  const decorator = (target)=>{
    if(typeof args !== 'object') throw new Error('the argument must be an object');
    target.prototype.routeParams = args[0];
  }
  return decorator;
};

const Bootstrap = (...args)=>{
  const elm = document.querySelector('[ng-app]');
  const nameAngular = elm.getAttribute('ng-app');
  console.log(nameAngular);
  const decorator = (target)=>{

  }
};
export {Router, Bootstrap}
