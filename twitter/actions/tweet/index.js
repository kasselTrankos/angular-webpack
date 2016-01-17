import {connect, close, TwitterTweetModel} from './../../db';
import {Timeline} from './../../api';
var MongoClient = require('mongodb').MongoClient;

export const get = (req, params)=>{

  return new Promise((resolve, reject)=>{
     Timeline(params[0]).then((tweets)=>{
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
         if(response.status) resolve(tweets);
         else reject(response.error);
         close();
       });
      // TwitterTweetModel.save((err)=>{console.log(err,'ppp')});
       /*
       connect();
       TwitterTweetModel.collection.insert(tweets, (error, result)=>{
         close();
         if(error) reject(error);
         else resolve(tweets);
       });
      /* MongoClient.connect("mongodb://localhost:27017/vera", function(err, db) {


          // Get the collection
          var col = db.collection('twittertweets');

          // Initialize the Ordered Batch
          // You can use initializeUnorderedBulkOp to initialize Unordered Batch
          var bulk = col.initializeOrderedBulkOp();
          let i=0; const l = tweets.length;

          for(i;i<l;i++)
          {
            tweets[i].account = params[0];
            tweets[i].account_id = params[1];

            console.log(bulk, ' antes');
            console.log(bulk.find({id: tweets[i].id}), ' loco');
            //if(!bulk.find({id: tweet[i].id}))
            bulk.insert(tweet.toJSON());
            //console.log(bulk.find({id: tweets[i].id}), ' loco');
            //bulk.find({id: tweets[i].id}).upsert().update(tweets[i])
          }


          // Execute the operations
          bulk.execute(function(error, result) {
            console.log(error, ' 0 no 0 ',result);
            db.close();
            if(error) reject(error);
            else resolve(tweets);
          });
        });

       close();
       connect();
       console.log(TwitterTweetModel.collection, ' no model????');
       const bulk= TwitterTweetModel.collection.initializeUnorderedBulkOp();
       let i=0; const l = tweets.length;
       console.log(l, ' length');
       for(i;i<l;i++)
       {
         tweets[i].account = params[0];
         tweets[i].account_id = params[1];
         console.log(bulk, ' antes');
         console.log(bulk.find({id: tweets[ix].id}), ' loco');
         //if(!bulk.find({id: tweet[i].id}))
         //bulk.insert(tweet.toJSON());
       }
       bulk.execte((error, result)=>{
         if(error) reject(error);
         else resolve(tweets);
       });*/
       /*TwitterTweetModel.collection.insert(tweets, (error, result)=>{
         if(error) reject(error);
         else resolve(tweets);
       });*/
     },(error)=>{

       reject(error);
     });
   });
}
