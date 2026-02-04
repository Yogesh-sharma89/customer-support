import mongoose, { mongo } from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL

if(!MONGODB_URL){
    throw new Error("Mongodb url missing")
}

// Global type
const globalForMongoose = global as unknown as {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

let cache = globalForMongoose.mongoose

if(!cache){
    cache = globalForMongoose.mongoose = {
        conn:null,
        promise:null
    }
}

async function connectDb(){
    if(cache!.conn){
        return cache!.conn
    }

    if(!cache!.promise){
        cache!.promise = mongoose.connect(MONGODB_URL!,{
            bufferCommands:false
        })
    }

    cache!.conn = await cache!.promise;
    return cache!.conn
}

export default connectDb;