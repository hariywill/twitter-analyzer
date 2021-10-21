import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Jumbotron, Container } from 'reactstrap';
import Search from '../component/Search';
import fetchTweets from '../action/fetchTweets';
import { useGlobalContext } from '../context'

const Home = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setTweets, tweets } = useGlobalContext()

    const handleSubmit = async (value) => {
        try {
            const postBody = { twitterId: '0' }
            const res = await fetchTweets(value, postBody);
            console.log('Fetch tweets result:')
            console.log(res)
            setTweets(res.result)
                console.log('push!!!')
                history.push({
                    pathname: `/dashboard/${value}`,
                    //state: { detail: res }
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