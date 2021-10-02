const express = require('express');
const web_server = express()
const Koa = require("koa");
const cors = require("@koa/cors");
const proxy = require("koa-proxies");
const app = new Koa();
const proxyPort = process.env.PORT || 3001;
const webServerPort = process.env.PORT || 3002;
const corsOriginal = require("cors");




app.use(cors());
web_server.use(corsOriginal({
    origin: "*"
}));



web_server.get("/:base/:services/:action-v1/:api/:webhooks/:unid",function(req,res){
    let x = req
    let dynamicUrl = 'https://' + x.url.substring(1)
    app.myCustomProperty = dynamicUrl
    console.log(app.myCustomProperty)
    const currentdate = new Date(); 
    const datetime = "Proxyset: " + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

    console.log(datetime + ' Proxy has been set to: ', app.myCustomProperty)
    app.use(
        proxy("/", {
            target: app.myCustomProperty,
            changeOrigin: true,
            logs: true
        })
    );
    
    res.end();
}).listen(webServerPort);
app.listen(proxyPort);

console.log(`Listening on ${webServerPort} (web server) & ${proxyPort} (proxy server)`);