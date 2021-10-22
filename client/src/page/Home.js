import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Jumbotron, Container } from 'reactstrap';
import Search from '../component/Search';
import fetchTweets from '../action/fetchTweets';
import { useGlobalContext } from '../context'
import analyzeSentiment from '../action/analyzeSentiment';

const Home = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { setTweets, tweets, setUser, setSentiment } = useGlobalContext()

    const getOverallSentiment = (tweets) => {
        let senti = [ 0, 0, 0 ] //positive, negative, neutral
        console.log(tweets)
        tweets.map(tweet => {
            let num = analyzeSentiment(tweet.text.split(' '))
            if (num > 0) {
              senti[0] = senti[0] + 1
            } else if (num < 0) {
              senti[1] = senti[1] + 1
            } else {
              senti[2] = senti[2] + 1
            }
            })
            return senti
        }

    const handleSubmit = async (value) => {
        try {
            const postBody = { twitterId: '0' }
            const res = await fetchTweets(value, postBody);
            console.log('Fetch tweets result:')
            setTweets(res.tweets)
            setUser(res.user)
            setSentiment(getOverallSentiment(tweets))
            history.push({
                pathname: `/dashboard/${value}`,
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