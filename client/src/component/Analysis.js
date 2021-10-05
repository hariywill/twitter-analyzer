import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Summary from './Summary';
import Chart from './Chart';
import Tweets from './Tweets';

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
            <div className={classes.chart}>
                <Chart />
            </div>
            <div className={classes.emojis}>

            </div>
            <Tweets />
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    chart: {
        backgroundColor:'white',
        width:'50%',
        height: '50%',
        paddingLeft: '60px',
        paddingBottom: '30px'
    },
    emojis: {

    }
}))

export default Analysis