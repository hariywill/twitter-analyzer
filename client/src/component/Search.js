import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { FaSearch } from 'react-icons/fa'

const SearchBar = ({ onSubmit }) => {
    const [searchTerms, setSearchTerms] = useState('')
    const [error, setError] = useState('')
    const classes = useStyles()
    let data = require('./data.json')
    console.log(data.data[0])

    //handling submit
    const handleSubmit = () => { onSubmit(searchTerms) }

    const handleChange = (x) => {
        const { value } = x.target
        setSearchTerms(value)
    }

    //function to handle when user click enter
    const handleKeyPress = (e) => {
        //when there is no error
        if (e.which === 13 && !error) {
            handleSubmit()
        }
    }

    return (
        <div>
            <Grid className={classes.home} container spacing={24}>
                <Grid item md={8}>
                    <form className={classes.form}>
                        <input type="text" name="tags" label="Tags" onChange={e => handleChange(e.target.value)} onKeyPress={handleKeyPress} />
                        <button type="submit" size="large" className={classes.buttonSubmit} onClick={handleSubmit} ><FaSearch /></button>
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