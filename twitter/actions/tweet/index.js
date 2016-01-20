import {Timeline} from './../../api';
import {connect, close} from './../../db';
import {findAllTweetsByAccount, PushMongoTimelineRest} from './../../db/querys';
import Q from 'q';
import {Streaming} from './../../socket/account';
////////////////////Frist last data by RESt. Then open socket
export const get = (req, params)=>{
  ///activate stream, a ver como va!!!
  Streaming(params[0], parmas[1], 5000);
  connect();
  return Timeline(params[0])
  .then((docs)=>{
    return PushMongoTimelineRest(docs, params[0], params[1])
  })
  .then(()=>{return findAllTweetsByAccount(params[0])})
  .then((docs)=>{close(); return docs })
  .catch((err)=>err);
}
