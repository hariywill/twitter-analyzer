import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Jumbotron, Container } from 'reactstrap';
import Search from '../component/Search';
import fetchTweets from '../action/fetchTweets';


const Home = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (value) => {
        try {
            const postBody = { twitterId: '0' }
            const res = await fetchTweets(value, postBody);
            console.log(postBody)
            console.log(res)
            if (res.result.usernameError) {
                setError('No username found. Please enter a correct username')
            }
            else if (res.result.serverError) {
                setError('Error Fetching Data from Server')
            }
            else {
                history.push({
                    pathname: `/dashboard/${value}`,
                    state: { detail: res.result }
                })
            }
        } catch {
            setError('Error fetching data from server.')
        }
    }

    return (
        <div>
          <Jumbotron fluid>
            <Container fluid>
                <h1 className="display-3">How Positive are your Tweets?</h1>
                    <h4>Just enter a Twitter id and find out.</h4>
                    <Search 
                        onSubmit={async (value) => {
                            setError(false);
                            setLoading(true);
                            handleSubmit(value)
                        }} />
            </Container>
          </Jumbotron>
        </div>
    )

}


export default Home