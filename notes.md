

[ Client ] - send a request --> [ Server (API) ]

[ Server ] - sends a response --> [ Client ]


```js
const request = {
    header: {

    },

    body: {

    }
}

const createUser = function(urls, data) {
    return axios.post(url, data); // the data goes in request.body
}
```