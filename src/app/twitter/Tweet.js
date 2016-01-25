import {TweetStore} from './store';
const initialState = {
  loading: true,
  data: {},
  error: false
};

const Tweet = (state=initialState)=> {
  let factory;
  const Store = TweetStore(state.data);
  return {
    addFactory: (_factory, account)=>{
      factory = _factory;
      factory.socket(account, (tweet)=>{
        Store.append(tweet);
      });
    },
    load: (account)=>{
      state.loading = true;
      factory.loadAllTweetsFromAccount(account)
      .then((data)=>{
        state.data = data;
        state.error = false;
        state.loading = false;
      }).catch((e)=>{
        state.error = e;
        state.loading = false;
      });
    }

  }
}
export {Tweet}
