import React, { useState, useEffect, useContext } from 'react';
import analyzeSentiment from './action/analyzeSentiment';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [keywords, setKeywords] = useState([])
  const [tweets, setTweets] = useState([])
  
  //Mock data
  /* useEffect(() => {
    let data = require('./component/mockdata.json')
    let temp = data.map(tweetObject => {
          let senti = analyzeSentiment(tweetObject.text.split(' '))
          return {
              name: tweetObject.user.name,
              profile: tweetObject.user.profile_image_url,
              bio: tweetObject.user.description,
              date: tweetObject.created_at,
              user: tweetObject.id,
              tweet: tweetObject.text,
              //hashtags: tweetObject.entities.hashtags,
              sentiment: senti > 0 ? "happy" 
                    : senti == 0 ? "calm"
                    : "mad",
          }
    })
    setTweets(temp)
  }, []) */

  useEffect(() => {
    console.log(tweets)
  }, [tweets])

  return (
    <AppContext.Provider 
        value={{ keywords, setKeywords, tweets, setTweets }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider };