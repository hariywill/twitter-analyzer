import axios from "axios";

const fetchTweets = (value, postBody) => {
    return (
        axios.post(`/${value}`, postBody)
            .then(res => {
                const result = res.data;
                return { result }
            })
    )
}

export default fetchTweets