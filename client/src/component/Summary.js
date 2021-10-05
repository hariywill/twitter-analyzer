import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const Summary = ({ user, details }) => {
    const classes = useStyles()
    return (
        <div className={classes.summary}>
            {(user && details) && (
                <Grid container spacing={0} className={classes.summaryboard}>
                    <Grid item xs={4} className={classes.profile}>
                        <img src={user.img} className={classes.profilepic} />
                        <div className={classes.info}>
                            <h2>User</h2>
                            <p className={classes.username}>@{user.screen_name}</p>
                            <p className={classes.bio}>{user.bio}</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} >
                        <div className={classes.sentiment}>
                            <h3>😁: {details.sentiment.positive}%</h3>
                            <h3>😐: {details.sentiment.neutral}%</h3>
                            <h3>😠: {details.sentiment.negative}%</h3>
                        </div>
                    </Grid>
                    <Grid item xs={4} >
                        <div className={classes.details}>
                            <h4>From {details.data.start} to {details.data.end}: </h4>
                            <h3>This user has tweeted <span className={classes.numberoftweets}>{details.data.numberOfTweets}</span> times</h3>
                        </div>
                    </Grid>
                </Grid>
            )
            }
        </div>
    )
}


const useStyles = makeStyles(theme => ({
    summary: {
        backgroundColor: 'white',
    },
    profile: {
        verticalAlign: 'top',
        display: 'inline-block',
        textAlign: 'left'
    },
    summaryboard: {
        width: '96%',
        backgroundColor: '#1DA1F2',
        padding:'2%',
        margin:'2%',
        borderRadius: '10px',
        fontSize:'100%',
        textAlign:'justify'
    },
    profilepic: {
        width: '50px',
        height:'50px',
        justifyContent: 'center',
        paddingLeft: '40px',
        paddingRight: '10px'
    },
    info: {
        display: 'inline-block',
        paddingLeft: '40px',
        color: '#094067'
    },
    username: {
        fontSize:'85%',
        backgroundColor: 'yellow'
    },
    bio: {
        fontSize:'85%',
        backgroundColor: 'yellow',
    },
    sentiment: {
        paddingLeft: '50px',
        color: '#094067'
    },
    details: {
        color: '#094067'
    },
    numberoftweets: {
        fontSize: '200%',
        color: 'white'
    }
}))

export default Summary