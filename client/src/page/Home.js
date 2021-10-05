import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { FaTwitter } from 'react-icons/fa'

import Header from '../component/Header';
import Analysis from '../component/Analysis';


const Home = ({ match }) => {
    const [tweets, setTweets] = useState({});
    const [error, setError] = useState('');
    const location = useLocation();

    /* const fetchTweets = async () => {
        const responce = await fetch('https://api.twitter.com/2/users/by/username/TwitterDec')
        
        const data = await responce.json()
        setTweets(data.data)
    }
    useEffect(() => {
        fetchTweets()
        console.log(tweets);
    }, []) */
    
    /* useEffect(() => {
        if (location.state.detail) {
            setError('')
            setTweets(location.state.detail);
        }
        //Fetch tweets from server every 1 minute
        const interval = setInterval(async () => {
            try {
                const postBody = { twitterId: sessionStorage.getItem('TwitterID') }
                const resp = await FetchServer(match.params.account, postBody);
                resp.result.serverError && setError('Error Fetching tweets from Server');
                if (resp.result && !resp.result.serverError) {
                    setError('')
                    setTweets(resp.result);
                }
            } catch {
                setError('Unable to connect to the server. Please try again later')
            }
        }, 60000);

        return () => clearInterval(interval);

    }, [match.params.account, location.state.detail])

    useEffect(() => sessionStorage.setItem('TwitterID', tweets?.tweets && tweets.tweets[0].id), [tweets]) */

    return (
        <>
            <Header />
            <Analysis />
        </>
    )


    /* return (
        <Styles>
            {(tweets) && (
                <Row className="container-analysis">
                    <Col xs={12}><Header /></Col>
                    {error && <Col xs={12}> <Alert variant="danger"><Error text={error} /></Alert></Col>}
                    <Col xs={12}>
                        <UserProfile user={tweets.user} allsentiment={tweets.allsentiment} />
                    </Col>
                    <Col lg={4} className="col-tweets">
                        <div className="div-tweet-heading"><h5 className="title"><FaTwitter color="#3da9fc" />  Live Tweets</h5></div>
                        <div className="overflow-auto div-tweets">
                            {tweets.tweets && tweets.tweets.map((line) =>
                                <TweetDiv user={tweets.user} tweet={line} key={line.id} />
                            )}
                        </div>
                    </Col>
                    <Col lg={8} className="col-chart">
                        {tweets.monthlySentiment && <CreateChart tweets={tweets.monthlySentiment} />}
                    </Col>
                    <Col sm={12} className="wordcloud-heading">
                        {tweets.topics && <h3>Top Topics from Latest Tweets  <FaTwitter color="#3da9fc" /></h3>}
                    </Col>
                    <Col lg={12} >
                        <Row>
                            {tweets.topics?.map((topic, index) => <TopicWordCloud tweets={topic} count={index} key={topic.title} />)}
                        </Row>
                    </Col>
                </Row>
            )}
        </Styles >
    ) */
}


/* const Styles = styled.div`
    padding:3%;
    .container-analysis{
        padding:0px;
        margin-bottom:7%;
    }
    .col-tweets{
        padding-top:2%;
    }
    .div-tweets{
        padding:3%;
        height:460px;!important
    }
    .overflow-auto{
        background-color:#D8EEFE;!important
    }
    .title{
        text-align:center;
    }
    .wordcloud-heading{
        margin-top:2%;
        padding:2% 1%;
    }
    .col-chart{
        display:flex;
        align-items:flex-end;
        justify-content:center;
    }
    @media only screen and (min-width: 1450px) {
        padding: 4% 6% 3% 6%;
        .div-tweets{
            height:620px;!important
        }
    }
    
    @media only screen and (max-width: 586px) {
        padding:6%;
        h3{
            font-size: 120%
        }
        h5{
            font-size: 100%;
        }
        .wordcloud-heading{
            text-align:center;
            margin-top:6%;
        }
        .col-tweets{
            margin-top:6%;
        }
        .col-chart{
            margin-top:8%;
        }
    }
  
` */

export default Home