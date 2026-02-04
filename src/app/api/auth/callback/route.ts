import scaleKit from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url)

    const code = searchParams.get('code')

    if(!code){
        return NextResponse.json({message:'code is not found'},{status:400})
    }

    const session =  await scaleKit.authenticateWithCode(code,`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`)

    const respone = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`)

    console.log(session)

    respone.cookies.set('access_token',( session).accessToken,{
        httpOnly:true,
        maxAge:24*60*60*1000,
        path:'/',
        secure:false
    })

    return respone;
}