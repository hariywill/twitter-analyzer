import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [keywords, setKeywords] = useState([])
  const [tweets, setTweets] = useState([])
  const [user, setUser] = useState([])
  const [sentiment, setSentiment] = useState([])
  
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

  

  return (
    <AppContext.Provider 
        value={{ keywords, setKeywords, tweets, setTweets, user, setUser, sentiment, setSentiment }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider };