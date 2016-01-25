import Q from 'q';
import {connect, close,
  TwitterTweetModel, TwitterAccountModel} from './index';
export const findAllTweetsByAccount = (account, sort={created_at:-1})=>{
  let deferred = Q.defer();
  TwitterTweetModel.find({
    account:account
  }, 'text user.profile_image_url').sort(sort).exec((err, docs)=>{
    if(!err){
      deferred.resolve(docs);
    }else{
      console.log('ERROR en querys.findAllTweetsByAccount:',err, 'account', account);
       deferred.reject(err);
     }
  });
  return deferred.promise;
}
//esto debe ira a account so torpe!!!
export const GetIdFromAccount = (accountName)=>{
  let deferred = Q.defer();
  TwitterAccountModel.findOne({
    name:accountName
  }, '', (err, doc)=>{
    if(err) {
      console.log('ERROR en querys.GetIdFromAccount:',err, 'account', account);
      deferred.reject(err);
    }else {
      deferred.resolve(doc);
    }
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
        console.log('ERR en querys.PushMongoTimelineRest: ',err);
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
export const ExistsTweet = (tweet)=>{
  console.log(tweet.id)
  let deferred = Q.defer();
  TwitterTweetModel.findOne({id: tweet.id}, '',(err, doc)=>{
    if(!err)  {
      if(doc===null) deferred.resolve(tweet);
      else deferred.resolve(doc);
    }else{
      console.log('ERR en querys.ExistsTweet: ',err);
      deferred.reject(err);
    }
  });
  return deferred.promise;
}
export const InsertTweet = (tweet, account, account_id)=>{
  let deferred = Q.defer();

  tweet.account = account;
  tweet.account_id = account_id;
  var Tweet = new TwitterTweetModel(tweet);

  Tweet.save(
  (err, doc, numAffected)=> {
    if(!err){
      deferred.resolve(doc);
    }else{
      console.log('ERR en querys.InsertTweet: ',err);
      deferred.reject(err);
    }
  });
  return deferred.promise;
}
