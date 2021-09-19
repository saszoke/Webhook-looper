import axios from "axios";

export async function sendPost(parameters){
        
        let token = `${parameters.authentication.username}:${parameters.authentication.password}`;
        let encodedToken = Buffer.from(token).toString('base64');

        let resp = null
        let config = {
            method: 'post',
            url: parameters.URL,
            headers: { 
                'Authorization': `Basic ${encodedToken}`, 
            //     'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : parameters.body
        };

        // curl.post(parameters.URL, parameters.body, options, function(err, response, body) {});

        // postData(parameters.URL, parameters.body, encodedToken)
        await axios(config)
        .then(function (response) {
            resp = response
        })
        .catch(function (error) {
            resp = error.response
        });

        return resp
        
    }


// async function postData(url = '', data = {}, auth) {
//     console.log(auth)
//     // Default options are marked with *
//     const response = await fetch(url, {
//         method: 'POST', // *GET, POST, PUT, DELETE, etc.
//         mode: 'no-cors', // no-cors, *cors, same-origin
//         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: 'include', // include, *same-origin, omit
//         headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': `Basic ${auth}`,
//         },
//         redirect: 'follow', // manual, *follow, error
//         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//     }
