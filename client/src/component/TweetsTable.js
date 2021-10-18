import React, { useState, useEffect } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useGlobalContext } from '../context';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const TweetsTable = ({ tweets }) => {
    //const { tags } = useGlobalContext()
    /* const [rowData, setRowData] = useState([])
    console.log(tweets)
    const tags = ["Lebron"]

    const filterTweets = () => {
        tweets = tweets.filter(tweet => {
                return tweet.tweet.includes(tags)
            })
        }
    }

    useEffect(() => {
        filterTweets()
        console.log(tweets)
    }, [tags]) */

    return (
        <div>
            <div className="ag-theme-alpine" style={{height: 400, width: '96%'}}>
                <AgGridReact
                    rowData={tweets}
                >
                    <AgGridColumn field="date" width={'auto'}></AgGridColumn> 
                    <AgGridColumn field="mention" width={'auto'}></AgGridColumn>
                    <AgGridColumn field="tweet" width={'auto'}></AgGridColumn>
                    <AgGridColumn field="sentiment" width={'auto'}></AgGridColumn>
                </AgGridReact>
            </div>
        </div>
    )
}

export default TweetsTable
