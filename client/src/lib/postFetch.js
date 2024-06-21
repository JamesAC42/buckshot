const postFetch = async (url, body) => {
    
    try {

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        if(body) {
            data.body = JSON.stringify(body);
        }
        const response = await fetch(url, data);

        const responseBody = await response.json();
        return responseBody;
    } catch(error) {
        console.error(error);
        throw(error);
    }
}

export default postFetch;