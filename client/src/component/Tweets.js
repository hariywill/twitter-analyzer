import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TweetsTable from './TweetsTable';
import Keywords from './Keywords';
import { useGlobalContext } from '../context';
import analyzeSentiment from '../action/analyzeSentiment';

const Tweets = () => {
    const classes = useStyles()
    const { keywords } = useGlobalContext()
    let data = require('./data.json')
    console.log(data)
      let tweets = data.map((tweetObject) => {
        let senti = analyzeSentiment(tweetObject.text.split(' '))
        let mentionArray = tweetObject.entities.user_mentions
        let mentionString
        if (mentionArray.length > 0) {
            mentionString = mentionArray
                                    .map(mention => mention.screen_name)
                                    .join(', ')
        } else mentionString = "-"
        let newarray = {
              date: tweetObject.created_at,
              mention: mentionString,
              tweet: tweetObject.text,
              sentiment: senti > 0 ? "happy" 
                    : senti == 0 ? "calm"
                    : "mad"
          }  
        return newarray 
      })
    
    return (
        <div className={classes.tweetsboard}>
            <Keywords />
            <h1 className={classes.title}>Filltered Tweets</h1>
            {tweets.length > 0 ?
                    <div className={classes.table}>
                        <TweetsTable tweets={tweets} />
                    </div>
                :
                    <h2>No Available Tweets</h2>
            }
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    tweetsboard: {
        paddingLeft: '50px',
        backgroundColor: '#1DA1F2'
        
    },
    title: {
        justifyContent: 'center',
        display: 'flex'
    },
    table: {
        width: '100%'
    }
}))

export default Tweets
