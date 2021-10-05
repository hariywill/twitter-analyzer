import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Typography } from '@material-ui/core';
import { useGlobalContext } from '../context';

const Tags = () => {
    const classes = useStyles()
    const { tags, setTags } = useGlobalContext()
    const handleChange = (e) => {
        const string = e.target.value
        const tagArray = string.split(',')
        setTags(tagArray)
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className={classes.tagsboard}>
            <Grid container spacing={0} className={classes.tagsinputgroup}>
                <Grid tiem xs={4}></Grid>
                <Grid item xs={4}>
                    <Typography>Type in tags to filter tweets</Typography>
                    <TextField fullWidth label="Tags" id="fullWidth" onChange={handleChange} className={classes.tagsinput} />
                </Grid>
                <Grid tiem xs={4}></Grid>                
            </Grid>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    tagsboard: {
        paddingLeft: '50px',
        //boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
        
    },
    tagsinputgroup: {
        width: '96%',
        justifyContent: 'center',
        display: 'flex',
        backgroundColor: 'yellow',
        paddingBottom: '10px',
        paddingTop: '10px',
    },
    tagsinput: {
        justifyContent: 'center',
    }
}))

export default Tags