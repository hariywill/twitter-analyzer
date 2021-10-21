import axios from "axios";

const fetchTweets = async (value, postBody) => {
    console.log('fetched from frontend')
    try {
        const response = await axios.post(`/${value}`, postBody);
        return response.data;
    } catch(err) {
        return err.message;
    }
    /* return (
        axios.post(`/${value}`, postBody)
            .then(res => {
                const result = res.data;
                return { result }
            })
    ) */
}

export default fetchTweets