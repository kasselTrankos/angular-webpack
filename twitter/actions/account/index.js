import {connect, close, TwitterAccountModel} from './../../db';
import {UnionUnique} from './../../utils/url';
import Q from 'q';
export const post = (req, params)=> {
  connect();
  const {account} = req.body;
  let deferred = Q.defer();
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
          deferred.reject(err);
        }else{
          deferred.resolve(docs);
        }
      });
    }
  });
  return deferred.promise;
}
export const get = (req, params)=> {
  connect();
  let deferred = Q.defer();
  TwitterAccountModel.find(
    {}, 'account',
    (err, docs)=> {
      console.log(docs);
      close();
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(docs);
      }
  });
  return deferred.promise;
}
