import Q from 'q';
import {connect, close,
  TwitterTweetModel, TwitterAccountModel} from './index';
export const findAllTweetsByAccount = (account, sort={created_at:-1})=>{
  let deferred = Q.defer();
  TwitterTweetModel.find({
    account:account
  }, 'text').sort(sort).exec((err, docs)=>{
    if(!err) deferred.resolve(docs);
    else deferred.reject(err);
    close();
  });
  return deferred.promise;
}
export const GetIdFromAccount = (account)=>{
  console.log('ACCOUNT', account, ' JOSR ');
  let deferred = Q.defer();
  TwitterAccountModel.findOne({
    account:account
  }, '', (err, doc)=>{
    console.log(account, 'get the id load', doc, 'ERR', err);
    if(err) deferred.reject(err);
    else deferred.resolve(doc);
  })
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
//will be asociated to previous function, ( power of functional, complex before is update/insert and now not)
export const InsertTweet = (tweet, account, account_id)=>{
  let deferred = Q.defer();
  tweet.account = account;

  tweet.account_id = account_id;
  var Tweet = new TwitterTweetModel(tweet);
  console.log('wehere save it', tweet.text);
  Tweet.save(
  (err, doc, numAffected)=> {
    console.log('ERROR', err, ' TWEET SAVED???', doc, numAffected);
    if(!err)  deferred.resolve(doc);
    else deferred.reject(err);
  });
  return deferred.promise;
}
