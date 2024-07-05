const getFetch = async (url, body) => {
    
    try {

        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        let urlParams = "?";
        for(let key in body) {
            if(typeof key !== 'string' || typeof(body[key]) !== 'string') {
                throw new Error("Only include strings in GET url params.");
            }
            urlParams += key + "=" + body[key] + "&";
        }
        urlParams = urlParams.substring(0, urlParams.length - 1);
        const response = await fetch(url + urlParams, data);
        const responseBody = await response.json();
        return responseBody;
    } catch(error) {
        console.error(error);
        throw(error);
    }
}

export default getFetch;