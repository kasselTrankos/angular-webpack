import {client} from './twitter';
export const Timeline = (screenName)=> {
  console.log(client);
  return new Promise((resolve, reject)=> {
    client.get('statuses/user_timeline', {screen_name: screenName}, function(error, tweets, response){
      ///console.log('ERROR.', error, ' TWEETS', tweets, ' RESPONS', response)
      if(error) reject('Error, account whith error:"', error,"'" );
      else  resolve(tweets);
    });
  });

}
