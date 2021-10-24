import React, { useState, useEffect } from 'react'
import ReactWordcloud from 'react-wordcloud';
import { useGlobalContext } from '../context';

const WordCloud = () => {
    const [words, setWords] = useState([])
    const { tweets } = useGlobalContext()

    //get the hashtags from all tweets text
    const getHashtags = (tweets) => {
        var newTweets = tweets
            .filter(tweet => {
                return tweet.text.includes("#")
            })
            .map(tweet => {
                return tweet.text
            })
        var hashtags = newTweets.map(string => {
            //does not take numbers
            return string.match(/#[^\s#]*/gmi)
        })
        hashtags = hashtags
            .toString()
            .split(',')
            .filter((val)=>{
                return !(val === "");
            })
        return hashtags
    }
    
    //generate "words" object for react-wordcloud
    const countWords = (hashtags) => {
        var count = {};
        hashtags.forEach((i) => { count[i] = (count[i]||0) + 1;})
        count = Object.entries(count)
        var words = count.map(c => {
            return {
                text: c[0].substring(1),
                value: c[1]
            }
        })
        return words
    }

    useEffect(() => {
        setWords(countWords(getHashtags(tweets)))
    }, [tweets])

    return (
        <div>
            <h2>Hashtag Cloud</h2>
            <ReactWordcloud words={words}  />
        </div>
    )
}

export default WordCloud
