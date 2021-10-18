import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import Header from '../component/Header';
import Analysis from '../component/Analysis';
import fetchTweets from '../action/fetchTweets';

const Dashboard = ({ result }) => {
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const location = useLocation()

    useEffect(() => {
        if (location.state.detail) {
            setError('')
            setData(location.state.detail);
        }
        //Fetch data from server every 1 minute
        const interval = setInterval(async () => {
            try {
                const postBody = { twitterId: sessionStorage.getItem('TwitterID') }
                const resp = await fetchTweets(result.params.account, postBody);
                resp.result.serverError && setError('Error Fetching Data from Server');
                if (resp.result && !resp.result.serverError) {
                    setError('')
                    setData(resp.result);
                }
            } catch {
                setError('Unable to connect to the server. Please try again later')
            }
        }, 60000);

        return () => clearInterval(interval);

    }, [result.params.account, location.state.detail])

    //Saving Tweet ID to be sent as a body in the post request.
    useEffect(() => sessionStorage.setItem('TwitterID', data?.tweets && data.tweets[0].id), [data])

    return (
        <>
            <Header />
            <Analysis />
        </>
    )

}


export default Dashboard