import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import fetchTweets from '../action/fetchTweets';
import { useGlobalContext } from '../context'
import analyzeSentiment from '../action/analyzeSentiment';

import { makeStyles } from '@material-ui/core/styles';


import Search from './Search'

const Header = () => {
    const classes = useStyles()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setTweets, tweets, setUser, setSentiment } = useGlobalContext()

    const getOverallSentiment = (tweets) => {
        let senti = [ 0, 0, 0 ] //positive, negative, neutral
        console.log(tweets)
        tweets.map(tweet => {
            let num = analyzeSentiment(tweet.text.split(' '))
            if (num > 0) {
              senti[0] = senti[0] + 1
            } else if (num < 0) {
              senti[1] = senti[1] + 1
            } else {
              senti[2] = senti[2] + 1
            }
            })
            return senti
        }

    const handleSubmit = async (value) => {
        try {
            const postBody = { twitterId: '0' }
            const res = await fetchTweets(value, postBody);
            console.log('Fetch tweets result:')
            setTweets(res.tweets)
            setUser(res.user)
            setSentiment(getOverallSentiment(tweets))
            history.push({
                pathname: `/dashboard/${value}`,
            })
            /* if (res.result.usernameError) {
                setError('No username found. Please enter a correct username')
                console.log(error)
            }
            else if (res.result.serverError) {
                setError('Error Fetching Data from Server')
                console.log(error)
            }
            else {
                setTweets(res.result)
                console.log('push!!!')
                history.push({
                    pathname: `/dashboard/${value}`,
                    //state: { detail: res }
                })
            } */
        } catch {
            //setError('Error fetching data from server.')
        }
    }

    return (
        <div>
            <Grid className={classes.row} container spacing={24}>
                <Grid item md={9}>
                    <Typography variant="h4" className={classes.text}><Link to="/" className={classes.text}>Tweets Analysis</Link></Typography>
                </Grid>
                <Grid item md={3}>
                    <Search onSubmit={async (value) => {handleSubmit(value)}} />
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    row: {
       marginRight: '0px',
       marginLeft: '0px',
       backgroundColor: '#094067'
    },
    text: {
       color: 'ivory',
       paddingLeft: '20px',
       textDecoration: 'none'
    },
    loading: {
        paddingLeft: '2.2%',
    },
    error: {
        marginLeft: '2%',
        padding: '0%'
    },
}))



export default Header