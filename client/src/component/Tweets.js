import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TweetsTable from './TweetsTable';
import Keywords from './Keywords';
import { useGlobalContext } from '../context';
import analyzeSentiment from '../action/analyzeSentiment';

const Tweets = () => {
    const classes = useStyles()
    const { tweets } = useGlobalContext()

    let data = tweets.map((tweetObject) => {
        let senti = analyzeSentiment(tweetObject.text.split(' '))
        let newarray = {
                date: tweetObject.date.slice(0, 10),
                tweet: tweetObject.text,
                sentiment: senti > 0 ? "😁" 
                      : senti == 0 ? "😐"
                      : "😠"
        }  
        return newarray 
    })
    
    return (
        <div className={classes.tweetsboard}>
            {/* <Keywords /> */}
            <h1 className={classes.title}>Filltered Tweets</h1>
            {tweets.length > 0 ?
                    <div className={classes.table}>
                        <TweetsTable tweets={data} />
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
