import React, { useState, useEffect } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useGlobalContext } from '../context';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const TweetsTable = ({ tweets }) => {
    const [rowData, setRowdata] = useState()
    const { tags } = useGlobalContext()

    const filterTweets = () => {
        let temp = []
        tags.forEach(tag => {
            temp = tweets.filter(tweet => {
                return tweet.includes(tag)
            })
        })
        setRowdata(temp)
    }

    useEffect(() => {
        console.log(tweets);
        setRowdata(tweets)
        console.log(rowData);
    }, [])

    useEffect(() => {
        filterTweets()
    }, [tags])

    return (
        <div>
            <div className="ag-theme-alpine" style={{height: 400, width: '96%'}}>
                <AgGridReact
                    rowData={rowData}
                >
                    <AgGridColumn field="date" width={'auto'}></AgGridColumn> 
                    <AgGridColumn field="user" width={'auto'}></AgGridColumn>
                    <AgGridColumn field="tweet" width={'auto'}></AgGridColumn>
                </AgGridReact>
            </div>
        </div>
    )
}

export default TweetsTable
