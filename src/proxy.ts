import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/getUserSession";

export async function proxy(req:NextRequest){
    const session = await getSession()

    if(!session){
        return NextResponse.redirect('http://localhost:3000/')
    }

    return NextResponse.next();
}

export const config = {
    matcher : ['/dashboard/:path*','/embed/:path*']
}