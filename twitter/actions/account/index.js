
import {connect, close, TwitterAccountModel} from './../../db';
import {SaveNewAccount, ExitsAccount, GetAll} from './../../db/account';
//import {UnionUnique} from './../../utils/url';
import Q from 'q';
export const post = (req, params)=> {
  connect();
  const {name} = req.body;
  return ExitsAccount(name)
  .then((doc)=>{
    if(doc==null) return SaveNewAccount(name);
    return doc;
  })
  .then((doc)=>GetAll())
  .catch((err)=>{
    console.log(err);
    close();
  });
  /*connect();
  const {name} = req.body;
  console.log(name, ' ave?');
  let deferred = Q.defer();
  TwitterAccountModel.update(
    {name: name},
    {
      $set: {name: name}
    },
    {upsert: true, new: true},
    (err, rowsAffected)=> {

      if(err){
        reject('Error, name whith error:"', err,"'" );
      }else{
        console.log('saved bevfor',rowsAffected);
      TwitterAccountModel.find(
        {}, 'name _id',
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
  return deferred.promise;*/
}
export const get = (req, params)=> {
  connect();
  let deferred = Q.defer();
  TwitterAccountModel.find(
    {}, 'name',
    (err, docs)=> {
      close();
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(docs);
      }
  });
  return deferred.promise;
}
