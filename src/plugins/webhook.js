import {sendPost} from './send';
import { myVueInstance } from '../main'


export function postWebHook(receivedObj){
    let startIndex = 0

    let loop = setInterval(() => {
        let finalObj = {}
        receivedObj.metaData.selects.forEach(field => {
            finalObj[field] = receivedObj.metaData.data[startIndex][field]
        })

        let resp = sendPost(
            {'authentication': {
                'username': receivedObj.authData.apiUser,
                'password': receivedObj.authData.apiPassword
                },
            'body': finalObj,
            'URL': 'http://localhost:3000'
            }
            )

        if (resp.status > 300){
        } else {
            // miért ez az ág? 
            myVueInstance.$children[0].add()
        }

        
        if (++startIndex ==  receivedObj.metaData.data.length) clearInterval(loop)
    }, 200);

}









