import connectDb from "@/lib/db";
import Settings from "@/models/settings.model";
import { NextResponse } from "next/server";

export async function POST(req:NextResponse){
    try{

        const {ownerId} = await req.json()

        if(!ownerId){
            return NextResponse.json(
                {message:'Owner Id is required'},
                {status:400}
            )
        }

        await connectDb();

        const setting = await Settings.findOne({ownerId});

        return NextResponse.json(setting)

    }catch(err){
        console.log('Error occured in  get  api : '+err)
        return NextResponse.json(
            {message:'Internal server error'},
            {status:500}
        )
    }
}