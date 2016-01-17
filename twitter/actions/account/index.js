import {connect, close, TwitterAccountModel} from './../../db';
import {UnionUnique} from './../../utils/url';
export const post = (req, params)=> {
  connect();
  const {account} = req.body;
  return new Promise((resolve, reject)=>{

    TwitterAccountModel.update(
      {account: account},
      {
        $set: {account: account}
      },
      {upsert: true, new: true},
      (err, rowsAffected)=> {

        if(err){
          reject('Error, account whith error:"', err,"'" );
        }else{
          TwitterAccountModel.find(
            {}, 'account _id',
            (err, docs)=>{
              close();
              if(err) {
                reject(err);
              }else{
              req.session.accounts = docs;
              resolve(req.session.accounts);
            }
          });


        }
        /////UPDATE
      });
  });
}
export const get = (req, params)=> {
  connect();
  return new Promise((resolve, reject)=>{
    TwitterAccountModel.find(
      {}, 'account',
      (err, docs)=> {
        close();
        if(err){
          reject('Error, account whith error:"', err,"'" );
        }else{
          req.session.accounts = docs
          resolve(req.session.accounts);
        }
      });
  });
}
