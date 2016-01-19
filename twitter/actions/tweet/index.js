import Timeline from './../../api';
import {findAllTweetsByAccount, PushMongoTimelineRest} from './../../db/querys';
import Q from 'q';

export const get = (req, params)=>{
  console.log(' im calling here????');
  return Q.fcall(Timeline)
  .then(PushMongoTimelineRest)
  .then(findAllTweetsByAccount)
  .then((docs)=>{
    return docs;
  })
  .catch((err)=>{
    return err;
  });

}
