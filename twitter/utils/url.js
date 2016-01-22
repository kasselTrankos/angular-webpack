export const mapUrl = (availableActions = {}, url = [])=> {
  const notFound = {action: null, params: []};

  // test for empty input
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  /*eslint-disable */
  const reducer = (next, current) => {
    if (next.action && next.action[current]) {
      return {action: next.action[current], params: []}; // go deeper
    } else {
      if (typeof next.action === 'function') {
        return {action: next.action, params: next.params.concat(current)}; // params are found
      } else {
        return notFound;
      }
    }
  };
  /*eslint-enable */
  const actionAndParams = url.reduce(reducer, {action: availableActions, params: []});

  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}
export const middleware = (req, res, actions)=> {

  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const {action, params} = mapUrl(actions, splittedUrlPath);

  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
}
export const UnionUnique = (array_0, array_1)=> {
  const Array0 = array_0 || [];
  const Array1 = array_1 || [];
  return (compare)=>{
    return Array0.concat(Array1.filter((item)=> compare(item, Array0)));
  }
}
