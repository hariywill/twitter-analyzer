import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useGlobalContext } from '../context';

const Summary = () => {
    const classes = useStyles()
    const { tweets, user, sentiment } = useGlobalContext()
    const positive = (sentiment[0] / 200) * 100 
    const negative = (sentiment[1] / 200) * 100
    const neutral = (sentiment[2] / 200) * 100
    return (
        <div className={classes.summary}>
            {(tweets.length > 0) && (
                <Grid container spacing={0} className={classes.summaryboard}>
                    <Grid item xs={4} className={classes.profile}>
                        <img src={user.img} className={classes.profilepic} />
                        <div className={classes.info}>
                            <p className={classes.username}>@{user.screen_name}</p>
                            <p className={classes.bio}>{user.description}</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} >
                        <div className={classes.sentiment}>
                            <h3>😁 : {parseInt(positive)}%</h3>
                            <h3>😐 : {parseInt(neutral)}%</h3>
                            <h3>😠 : {parseInt(negative)}%</h3>
                        </div>
                    </Grid>
                    <Grid item xs={4} >
                        <div className={classes.details}>
                            <h3>The last <span className={classes.numberoftweets}>{tweets.length}</span> tweets of this user.</h3>
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
    },
    bio: {
        fontSize:'85%',
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