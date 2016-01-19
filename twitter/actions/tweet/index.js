import {Timeline} from './../../api';
import {connect, close} from './../../db';
import {findAllTweetsByAccount, PushMongoTimelineRest} from './../../db/querys';
import Q from 'q';

export const get = (req, params)=>{
  console.log(' im calling here????', params[0]);
  connect();
  return Timeline(params[0])
  .then((docs)=>{
    return PushMongoTimelineRest(docs, params[0], params[1])
  })
  .then(()=>{return findAllTweetsByAccount(params[0])})
  .then((docs)=>{close(); return docs })
  .catch((err)=>err);
}
