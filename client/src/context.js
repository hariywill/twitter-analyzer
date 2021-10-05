import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [tags, setTags] = useState([])
    /* let data = require('./component/data.json')
    const [tweets, setTweets] = useState()

    useEffect(() => {
        let temp = data.data.map(tweetObject => {
            return {
                date: tweetObject.created_at,
                user: tweetObject.id,
                tweet: tweetObject.text
            }
        })
        console.log(`context.js temp: ${temp}`)
        console.log(`xontext.js tweets: ${tweets}`)
        setTweets(temp)
    }, []) */

  return (
    <AppContext.Provider 
        value={{ tags, setTags }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider };