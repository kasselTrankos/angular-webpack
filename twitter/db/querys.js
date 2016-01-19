import Q from 'q';
import {connect, close, TwitterTweetModel} from './index';
export const findAllTweetsByAccount = (account, sort={created_at:-1})=>{
  let deferred = Q.defer();
  console.log(account, 'ACCOUNT');
  //connect();
  TwitterTweetModel.find({
    account:account
  }, 'text').sort(sort).exec((err, docs)=>{
    if(!err) deferred.resolve(docs);
    else deferred.reject(err);
    close();
  });
  return deferred.promise;
}
export const PushMongoTimelineRest = (tweets, account, account_id)=>{
  let i=0; const l = tweets.length;
  let deferred = Q.defer();
  const updateInsert = (tweet, callback)=>{
    tweet.account = account;
    tweet.account_id = account_id;
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
    if(response.status) {
      deferred.resolve(tweets);
    }else {
      deferred.reject(response.error);
    }
  //  close();
  });
  return deferred.promise;
}
