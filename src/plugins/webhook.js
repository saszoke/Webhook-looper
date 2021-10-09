import {sendPost} from './send';
import { myVueInstance } from '../main'


export function postWebHook(receivedObj){
    let startIndex = 0
    let finalObj

    let loop = setInterval(async () => {
        finalObj = {}

        try{
            if (startIndex < receivedObj.metaData.data.length){
                
                receivedObj.metaData.selects.forEach(field => {
                    finalObj[field] = receivedObj.metaData.data[startIndex][field]
                })
                ++startIndex;
        
                let resp = await sendPost(
                        {
                            'authentication': {
                                'username': receivedObj.authData.apiUser,
                                'password': receivedObj.authData.apiPassword
                            },
                            'body': finalObj,
                            'URL': 'http://localhost:3002/' + receivedObj.authData.URL.substring(8)
                        }
                    )

                if (resp.status > 300){
                    try{
                        myVueInstance.$children[0].fail({status: resp.status, statusText: resp.statusText})
                    } catch(err){
                        console.log('Something went wrong with a webhook request', err)
                    }
                } else {
                    myVueInstance.$children[0].success()
                }
                
            } else {
                clearInterval(loop)
            }

        }catch(err){
            console.log("Something went wrong during looping...")
            console.log(err)
            clearInterval(loop);
            myVueInstance.$children[0].reset({"reason": "fatal"})
        }

        
        
    }, receivedObj.loopTimeBreak);



}









