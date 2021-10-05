import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';

import Search from './Search'

const Header = () => {
    /* const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory(); */
    const classes = useStyles()

    /* handleSubmit = async (value) => {
        setError(false)
        setLoading(true)

        try {
            const postBody = { twitterId: '0' }
            const res = await FetchServer(value, postBody);
            if (res.result.usernameError) {
                setError('No username found. Please enter a correct username')
            }
            else {
                setLoading(false)
                history.push({
                    pathname: `/analysis/${value}`,
                    state: { detail: res.result }
                })
            }
        } catch {
            setError('Error fetching data from server.')
        }
    } */

    const handleSubmit = () => {
        console.log("Submitted!")
    }

    return (
        <div>
            <Grid className={classes.row} container spacing={24}>
                <Grid item md={9}>
                    <Typography variant="h4" className={classes.text}>Tweets Analysis</Typography>
                </Grid>
                <Grid item md={3}>
                    <Search onSubmit={async (value) => {
                        
                        handleSubmit(value)
                    }} />
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
       paddingLeft: '20px'
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