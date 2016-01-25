import {Timeline} from './../../api';
import {connect, close} from './../../db';
import {findAllTweetsByAccount, PushMongoTimelineRest} from './../../db/querys';
import Q from 'q';
////////////////////Frist last data by RESt. Then open socket
export const get = (req, params)=>{
  ///activate stream, a ver como va!!!
  const [name] = params;
  console.log(name, ' CCOUNT NAMO');
  connect();
  return Timeline(name)
  .then((docs)=>{
    return PushMongoTimelineRest(docs, name)
  })
  .then(()=>{
    return findAllTweetsByAccount(name)}
  )
  .then((docs)=>{close(); return docs })
  .catch((err)=>{
    close();
    console.log(err);
  });
}
