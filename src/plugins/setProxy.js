import axios from "axios";

export async function setProxy(URL){
        
        let config = {
            method: 'get',
            url: 'http://localhost:3002/' + URL.substring(8)
        };

        try{
            axios(config)
        } catch{()=>{ console.log('catched sg')}}
    }