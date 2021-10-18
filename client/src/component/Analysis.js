import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Summary from './Summary';
import Chart from './Chart';
import Tweets from './Tweets';
import WordCloud from './WordCloud';

const Analysis = () => {
    const classes = useStyles()
    const user = {
        img: 'http://placehold.it/120x120&text=image1',
        screen_name: 'Twitteruser',
        bio: 'This is a user'
    }
    const details = {
        sentiment: {
            positive: 30,
            neutral: 40,
            negative: 30
        },
        data: {
            start: '01/01/2021',
            end: (new Date()).toLocaleDateString(),
            numberOfTweets: 284
        },
    }
    return (
        <div>
            <Summary user={user} details={details} />
            <Grid container className={classes.charts} >
                <Grid item md={6} className={classes.barchart}>
                    <Chart />
                </Grid>
                <Grid item md={6} className={classes.wordcloud}>
                    <WordCloud />
                </Grid>
            </Grid>
            <Tweets />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    /* charts: {
        display: 'flex',
        
    }, */
    barchart: {
        backgroundColor:'white',
        width:'50%',
        height: '50%',
        paddingLeft: '60px',
        paddingBottom: '30px',
    },
    wordcloud: {
    }
}))

export default Analysis