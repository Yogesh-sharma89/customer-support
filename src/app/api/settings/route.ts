import connectDb from "@/lib/db";
import Settings from "@/models/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{

        const {ownerId,businessName,supportEmail,data} = await req.json();

        if(!ownerId || !businessName || !data){
            return NextResponse.json(
                {message:'Required information is missing'},
                {status:400}
            )
        }

        await connectDb()

        const settings = await Settings.findOneAndUpdate(
            {ownerId},
            {ownerId,businessName,supportEmail,data},
            {new:true,upsert:true,runValidators:true}
        )

        return NextResponse.json(settings)


    }catch(err){
        console.log('Error occured in setting api : '+err)
        return NextResponse.json(
            {message:'Internal server error'},
            {status:500}
        )
    }
}