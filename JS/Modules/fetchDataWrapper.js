export async function fetchData(resourceURI) {
    try {
        //1) Implementing an HTTP client / making AJAX calls.
        const response = await fetch(resourceURI);
        console.log(response)
        //2) Validate the HTTP response message
        if(!response.ok) {
            //We got an invalid response
            throw new Error(`An error occurred by processing the request ${response.status}`);
        }
        //3) Retrieve the payload (the data we fetched) from the response.
        const data = await response.json(); //json returns a 'promise' that's why we use 'await'
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
}