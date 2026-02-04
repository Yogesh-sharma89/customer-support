import scaleKit from "@/lib/scalekit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
    
    const redirectUri = 'http://localhost:3000/api/auth/callback'

    const options = {
            scopes: ['openid', 'profile', 'email', 'offline_access']
    };

     const authorizationUrl = scaleKit.getAuthorizationUrl(redirectUri,options)

    return NextResponse.redirect(authorizationUrl)


}