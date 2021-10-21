import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaSearch } from 'react-icons/fa';
import { Grid } from '@material-ui/core';
import { useGlobalContext } from '../context';
import fetchTweets from '../action/fetchTweets';

const SearchBar = ({ onSubmit }) => {
    const [searchTerms, setSearchTerms] = useState('')
    const [error, setError] = useState('')
    const classes = useStyles()
    //const { setTweets } = useGlobalContext()

    const handleChange = (x) => {
        const { value } = x.target;
        if (/[^\w]/.test(value)) {
            setError("There is no special characters in Twitter username. Please enter a correct username.");
        } else if (value.length > 15) {
            setError("Please enter a Twitter username with less than 15 characters length.");
        }
        else {
            setError(null)
        }
        setSearchTerms(value)
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        onSubmit(searchTerms)
    }

    //function to handle when user click enter
    const handleKeyPress = (e) => {
        //when there is no error
        if (e.which === 13 && !error) {
            handleSubmit();
        }
    }

    return (
        <div>
            <Grid className={classes.home} container spacing={24}>
                <Grid item md={8}>
                    <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
                        <input type="text" name="search" label="Search" onChange={e => handleChange(e)} onKeyPress={handleKeyPress} />
                        <button size="large" className={classes.buttonSubmit} onClick={(event) => handleSubmit(event)} ><FaSearch /></button>
                    </form>
                </Grid>
                <Grid item md={11}>
                    {/* {error && <Error text={error} />} */}
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    home: {
       width: '55%'
    },
    paper: {
      padding: theme.spacing(2),
    },
    form: {
      float: 'left',
      justifyContent: 'center',
      width: 'auto',
      position: 'relative',
      display: 'flex'
    },
    input: {
      width: '100%',
      border: '3px solid #1DA1F2',
      borderRight: 'none',
      padding: '5px',
      height: '20px',
      borderRadius: '5px 0 0 5px',
      outline: 'none',
      color: '#9DBFAF'
    },
    buttonSubmit: {
      width: '40px',
      height: '36px',
      border: '1px solid #1DA1F2',
      background: '#1DA1F2',
      textAlign: 'center',
      color: '#fff',
      borderRadius: '0 5px 5px 0',
      cursor: 'pointer',
      fontSize: '20px',
    },
}))

export default SearchBar