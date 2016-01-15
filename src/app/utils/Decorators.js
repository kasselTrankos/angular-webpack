const Router = (...args) =>{
  const decorator = (target)=>{
    const [url, template] = args;
    let params = {};
    if(url) params.url = url;
    if(template) params.template = template;
    target.prototype.routeParams = params
  }
  return decorator;
}
export {Router}
