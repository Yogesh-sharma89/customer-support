
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    
    const cookie = await cookies();

    cookie.delete('access_token');

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`)


}