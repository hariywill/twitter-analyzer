import React, { useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import { useGlobalContext } from '../context';

const Chart = () => {
    var months, labels, times, state
    const { tweets } = useGlobalContext()

    const getMonthsOfTweets = (tweets) => {
        var months = tweets.map(tweet => {
            //split the date string by " ", then get the second element of each string array which is month
            return (tweet.date.split(' '))[1]
        })
        return months
    }

    const countMonths = (months) => {
        const counts = {};
        months.forEach((x) => { counts[x] = (counts[x] || 0) + 1})
        return counts
    }
    months = countMonths(getMonthsOfTweets(tweets))
        labels = Object.keys(months)
        times = Object.values(months)
        state = {
            labels: labels,
              datasets: [
                    {
                      label: 'Number of tweets',
                      fill: false,
                      lineTension: 0,
                      backgroundColor: 'rgba(75,192,192,1)',
                      borderColor: 'rgba(75,192,192,1)',
                      borderWidth: 2,
                      data: times
                }
            ]
        }

    useEffect(() => {
        console.log(tweets)
    }, [])

    return (
        <div>
            <div className='header'>
                <h2 className='title'>Tweet Timeline</h2>
            </div>
            <Line
                data={state}
                options={{
                    title:{
                        display:true,
                        text:'Average Rainfall per month',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                }}
            />
        </div>
    )
}



export default Chart