export default class AccountStore {
  constructor() {
    this.accounts =[];
  }
  
  set Account(account){

  }
  get Accounts() {
    return this.accounts;
  }
  set Accounts(accounts) {
    this.accounts.push(accounts);
  }

}
