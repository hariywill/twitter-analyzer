const config = require('../config');
const twit = require('twit');
const actions = require('./handleTweets');
const T = new twit(config);
var AWS = require("aws-sdk");
const storeAWS = require('./aws');
const redis = require('redis');

module.exports = {

    getTweets: async (accountname, lastTwitterId) => {
        
        return new Promise((resolve, reject) => {
            const redisClient = redis.createClient({
                //host: config.elasticConfig,
                //port: 6379
            });
            redisClient.on('error', (err) => {
                resolve({ 'serverError': true })
            });

            let twitterData = {};
            const params = { Bucket: config.bucketName, Key: accountname };

            return redisClient.get(accountname, async (err, result) => {
                try {
                    //No tweets in bucket, pull from twitter
                    tweetsResult = await module.exports.fetchTweet(accountname);
                    //User does not exist
                    if (tweetsResult.error) {
                        return resolve({ 'usernameError': true })
                    } else {
                        const analysisResult = await actions.runAnalysis(tweetsResult[1]);
                        twitterData = await module.exports.buildTweetObject(analysisResult);
                        twitterData.user = tweetsResult[0];
                        //module.exports.storeCacheAndBucket(accountname, twitterData, redisClient)
                        
                        return resolve(twitterData);
                    }
                } catch (err) {
                    return resolve({ 'serverError': true })
                }
            })
        })
    },

    //Retrieves latest 200 tweets from twitter profile
    fetchTweet: (accountname) => {
        return new Promise((resolve, reject) => {
            const params = {
                screen_name: accountname,
                count: 200,
                tweet_mode: "extended"
            }
            console.log(params)
            T.get('statuses/user_timeline', params, function (err, data, response) {
                try {
                    const tweetsdata = []
                    const user = {
                        id: data[0].user.id,
                        name: data[0].user.name,
                        screen_name: data[0].user.screen_name,
                        description: data[0].user.description,
                        img: data[0].user.profile_image_url.replace(/_normal\./, '_bigger.'),
                        location: data[0].user.location,
                    }
                    data.map(result => {
                        const tweet = {}
                        tweet.id = result.id
                        tweet.text = result.full_text;
                        tweet.date = new Date(result.created_at);
                        tweetsdata.push(tweet);
                    })
                    console.log(user)
                    if (!err) {
                        return resolve([user, tweetsdata]);
                    }
                    else {
                        reject('Error: Something went wrong with Twitter API')
                    }
                } catch {
                    console.log(err)
                    return resolve({ 'error': true });
                }
            })
        })
    },

    //Updates S3 object to include updated tweets and analysis results
    updateTweetObject: async (newTweets, storedTweets) => {
        const latestTweets = await module.exports.mergeTweets(newTweets, storedTweets);
        const analysisResult = await actions.runAnalysis(latestTweets.tweets);
        const twitterData = await module.exports.buildTweetObject(analysisResult);
        twitterData.user = storedTweets.user;
        return (twitterData);
    },

    buildTweetObject: async (analysis) => {
        const data = {};
        data.tweets = analysis[0];
        //data.allsentiment = analysis[1];
        //data.topics = analysis[2];
        //data.monthlySentiment = analysis[3];
        return data;
    },

    mergeTweets: (newTweets, storedTweets) => {
        return new Promise((resolve, reject) => {
            newTweets.reverse();
            for (let i = 0; i < newTweets.length; i++) {
                if (storedTweets.tweets[0].id == newTweets[i].id) {
                    const removed = storedTweets.tweets.shift();
                }
            }
            //Ensures that the new & old tweets are merged in the correct order
            newTweets.forEach(element => {
                storedTweets.tweets.unshift(element);
            });

            //Limits amount of tweets to latest 100
            if (storedTweets.tweets.length > 100) {
                storedTweets.tweets.length = 100;
            }
            return resolve(storedTweets);

        })
    },

    //Checks for new tweets
    refreshTweets: (accountname, lastID) => {
        return new Promise((resolve, reject) => {
            const params = {
                screen_name: accountname,
                tweet_mode: "extended",
                since_id: lastID
            }

            T.get('statuses/user_timeline', params, function (err, data, response) {
                let newTweets = [];
                if (data.length > 0) {
                    data.map(result => {
                        const tweet = {}
                        tweet.id = result.id
                        tweet.text = result.full_text;
                        tweet.date = new Date(result.created_at);
                        newTweets.push(tweet);
                    })
                }
                if (!err) {
                    return resolve(newTweets);
                }
                else {
                    reject(err);
                }
            })
        })
    },
    storeCacheAndBucket: (accountname, twitterData, redisClient) => {
        storeAWS.storeS3(accountname, twitterData.user, twitterData.tweets)
        redisClient.setex(accountname, 90, twitterData.tweets[0].id)
    }
}