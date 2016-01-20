const initialState = {
  loading: true,
  data: {},
  error: false
};

const Tweet = (state=initialState)=> {
  let factory;
  return {
    addFactory: (_factory)=>{
      factory = _factory;
      factory.socket();
    },
    load: (account)=>{
      state.loading = true;
      factory.loadAllTweetsFromAccount(account)
      .then((data)=>{
        state.data = data;
        state.loading = false;
      }).catch((e)=>{
        state.error = e;
        state.loading = false;
      });
    }

  }
}
export {Tweet}
