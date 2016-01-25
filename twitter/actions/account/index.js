
import {connect, close, TwitterAccountModel} from './../../db';
import {SaveNewAccount, ExitsAccount, GetAll} from './../../db/account';
//import {UnionUnique} from './../../utils/url';
import Q from 'q';
export const post = (req, params)=> {
  connect();
  const {name} = req.body;
  return SaveNewAccount(name)
  .then((doc)=>{
    if(doc===null) return SaveNewAccount(name);
    return doc;
  })
  .then((doc)=>GetAll())
  .catch((err)=>{
    console.log(err);
    close();
  });

}
export const get = (req, params)=> {
  connect();
  return GetAll()
  .then((docs)=>{
    close();
    return docs
  })
  .catch((err)=>{
    close();
    console.log(err);

  })
}
