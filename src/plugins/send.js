import axios from "axios";

export async function sendPost(parameters){

        console.log(parameters.body)
        
        let token = `${parameters.authentication.username}:${parameters.authentication.password}`;
        let encodedToken = Buffer.from(token).toString('base64');

        let resp = null
        let config = {
            method: 'post',
            url: parameters.URL,
            headers: { 
                'Authorization': `Basic ${encodedToken}`, 
            },
            data: parameters.body
        };

        await axios(config)
        .then(function (response) {
            resp = response
        })
        .catch(function (error) {
            resp = error.response
        });

        return resp
        
    }