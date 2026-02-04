import { Scalekit } from '@scalekit-sdk/node';

if(!process.env.SCALEKIT_ENVIRONMENT_URL || ! process.env.SCALEKIT_CLIENT_ID || ! process.env.SCALEKIT_CLIENT_SECRET){
    throw new Error("Missing scalkit environment config")
}

const globalScaleKit = global as unknown as {
    scaleKit : Scalekit
}

const scaleKit = globalScaleKit.scaleKit || 
    new Scalekit(
        process.env.SCALEKIT_ENVIRONMENT_URL,
        process.env.SCALEKIT_CLIENT_ID,
        process.env.SCALEKIT_CLIENT_SECRET
    );

if(process.env.NODE_ENV!=='production'){
  
    globalScaleKit.scaleKit = scaleKit
}


export default scaleKit