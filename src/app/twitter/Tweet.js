const initialState = {
  loading: true,
  data: {},
  error: false
};

const Tweet = (state=initialState)=> {
  return {
    load: (account)=>{
      state.loading = true;
      state.factory.loadAllTweetsFromAccount(account)
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
