
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
    
    const cookie = await cookies();

    cookie.delete('access_token');

    return NextResponse.redirect('http://localhost:3000/')


}