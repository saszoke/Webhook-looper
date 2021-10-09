const express = require('express');
const proxyServerPort = process.env.PORT || 3002;
const proxyServer = express()
const axios = require('axios');
const cors = require("cors");
const bodyParser = require('body-parser')


// create application/json parser
const jsonParser = bodyParser.json()


proxyServer.use(cors({
    origin: "*"
}));


proxyServer.post("/:base/:services/:action-v1/:api/:webhooks/:unid", jsonParser, async function(req,res){

    console.log(Date4logger() + ' Forwarding data to: ', 'https://' + req.url.substring(1))

    let config = {
		method: 'post',
		url:'https://' + req.url.substring(1),
		headers: { 
			'Authorization': req.headers.authorization, 
		},
		data : req.body
	};

    await axios(config)
	.then(function (response) {
        res.status(response.status).send(response.statusText)
	})
	.catch(function (err) {
        console.log("<==== ERROR ====>")
		console.log(err.response.status)
		console.log(err.response.statusText)
        console.log("<==== ERROR ====>")
        res.status(err.response.status).send(err.response.statusText)
	});
}).listen(proxyServerPort);

function Date4logger(){
    const currentdate = new Date();

    const datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
    return datetime
}

console.log("Running proxy server on port", proxyServerPort)