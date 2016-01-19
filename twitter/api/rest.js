import {client} from './twitter';
import Q from 'q';
import {connect, close, TwitterTweetModel} from './../../db';

export const Timeline = (screenName)=> {
  const deferred = Q.defer();
  client.get('statuses/user_timeline', {screen_name: screenName}, function(error, tweets, response){
    if(error) deferred.reject('Error, account whith error:"', error,"'" );
    else  deferred.resolve(tweets);
  });
  return deferred.promise;
}
