
import AccountStore from './store/AccountStore';
import AccountFactory from './factories/AccountFactory';

const initialState = {
  loading: true,
  data: {},
  error: false
};

const Twitter = (state=initialState)=> {
  console.log('initial ', state);
  return {
    load: (account)=>{
      state.loading = true;
      account.loadAllAccounts()
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
export {Twitter};
