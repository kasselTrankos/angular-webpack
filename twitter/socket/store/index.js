export const StoreSocket = (io)=>{
  const sockets = [];
  return (account)=>{
    let store = Store(account, sockets)
    if(store!==null) return store.of;
    ///io.connect(`/ws/${account}`);
    store = {
      name: account,
      of: io.of(`/${account}`)
    }
    ///console.log(store.of);
    sockets.push(store);
    return store.of;
  }
}
export const Store = (account, arr)=>{
  let store = null;
  arr.map((elm)=>{
    if(elm.name===account) store = elm;
  });
  return store;
}
