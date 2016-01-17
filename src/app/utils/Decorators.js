import 'angular/angular.js';

const Router = (...args) =>{
  const decorator = (target)=>{
    if(typeof args !== 'object') throw new Error('the argument must be an object');
    target.prototype.routeParams = args[0];
  }
  return decorator;
};

const Bootstrap = (...args)=>{
  const [nameAngular] = args;
  const decorator = (target)=>{
    if(/provider/i.test(target.name)) {
      const [name, provider] = target.name.match(/(\w+)(provider)/i);

      console.log(' append antes o despues tu diraás!!', name, provider);
      angular.module('ng').provider(provider.toLowerCase(), target);
    }

  }
  return decorator;
};
export {Router, Bootstrap}
