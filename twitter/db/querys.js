import Q from 'q';
import {connect, close, TwitterTweetModel} from './db';
export const findAllTweetsByAccount = (account)=>{
  const deferred = Q.defer();
  TwitterTweetModel.find({
    account:account
  }).exec((err, docs)=>{
    if(!err) deferred.resolve(docs);
    else deferred.reject(err);
  });
  return deferred.promise;
}
export const PushMongoTimelineRest = (tweets)=>{
  let i=0; const l = tweets.length;
  connect();
  const updateInsert = (tweet, callback)=>{
    tweet.account = params[0];
    tweet.account_id = params[1];
    TwitterTweetModel.update(
    {id: tweet.id},
    {
      $set: tweet
    },
    {upsert: true, new: true},
    (err, rowsAffected)=> {
      if(err) {
        callback({status: false, error: err});
        return;
      }
      if(i<(tweets.length-1)) updateInsert(tweets[++i], callback);
      else callback({status: true});
    });
  };
  updateInsert(tweets[0], (response)=>{
    if(response.status) deferred.resolve(tweets);
    else deferred.reject(response.error);
    close();
  });
  return deferred.promise;
}
