import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TweetsTable from './TweetsTable';
import Tags from './Tags';
import { useGlobalContext } from '../context';

const Tweets = () => {
    const classes = useStyles()
    const { tags } = useGlobalContext()

    let data = require('./data.json')
    //console.log(data.data)
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        let temp = data.data.map(tweetObject => {
            return {
                date: tweetObject.created_at,
                user: tweetObject.id,
                tweet: tweetObject.text
            }
        })
        setTweets(temp)
    }, [])

    return (
        <div className={classes.tweetsboard}>
            <Tags />
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
        backgroundColor: 'yellow',
        
    },
    title: {
        justifyContent: 'center',
        backgroundColor: 'red',
        display: 'flex'
    },
    table: {
        backgroundColor: 'red',
        width: '100%'
    }
}))

export default Tweets
