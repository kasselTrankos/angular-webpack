import 'angular/angular.js';

const Router = (...args) =>{
  const decorator = (target)=>{
    if(typeof args !== 'object') throw new Error('the argument must be an object');
    target.prototype.routeParams = args[0];
  }
  return decorator;
};
const connect = (...args)=>{
  const [func, factory] = args;

  const decorator=(target)=>{
    target = ( Object.prototype.toString.call( target ) === '[object Array]' ) ? target[target.length-1] : target;
    const $args = (func)=>{
      return (func+'').replace(/\s+/g,'')
      .replace(/[/][*][^/*]*[*][/]/g,'') // strip simple comments
      .split('){',1)[0].replace(/^[^(]*[(]/,'') // extract the parameters
      .replace(/=[^,]+/g,'') // strip any ES6 defaults
      .split(',').filter(Boolean); // split & filter [""]
    }
    //console.log(millon, ' ARGS ',args);
    const nameAssocitatedTo = $args(func)[0];
    target.prototype[nameAssocitatedTo] = func();
    const methods = factory(target.prototype[nameAssocitatedTo]);
    for(var attrName in methods)
      target.prototype[nameAssocitatedTo][attrName] = methods[attrName];
  }
  return decorator;
};

const Bootstrap = ()=>{
  const decorator = (target)=>{
    const _normalizeConstructor = (input) =>{
        var constructorFn;

        if (input.constructor === Array) {
            //
            var injected = input.slice(0, input.length - 1);
            constructorFn = input[input.length - 1];
            constructorFn.$inject = injected;
        } else {
            constructorFn = input;
        }

        return constructorFn;
    }
    const _createFactoryArray = (constructorFn)=>{
        // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
        var args = constructorFn.$inject || [];
        var factoryArray = args.slice(); // create a copy of the array
        // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
        // dependency, and the final item is the factory function itself.
        factoryArray.push((...args) => {
            //return new constructorFn(...args);
            var instance = new constructorFn(...args);
            for (var key in instance) {
                instance[key] = instance[key];
            }
            return instance;
        });

        return factoryArray;
    }

    if(/provider/i.test(target.name)) {
      const [name, provider] = target.name.match(/(\w+)(provider)/i);
      angular.module('ng').provider(provider.toLowerCase(), target);
    }
    if(/factory/i.test(target.name)) {
      const [name, provider] = target.name.match(/(\w+)(factory)/i);
      target = _normalizeConstructor(target);
      const factoryArray = _createFactoryArray(target);
      angular.module('ng').factory(provider.toLowerCase(), factoryArray);
    }

  }
  return decorator;
};
export {Router, Bootstrap, connect}
