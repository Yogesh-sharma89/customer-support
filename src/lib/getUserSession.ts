import { cookies } from "next/headers";
import scaleKit from "./scalekit";

export async function getSession(){
    try{

        const session = await cookies();
        const token = session.get('access_token')?.value

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result:any = await scaleKit.validateToken(token!)
         const user = await scaleKit.user.getUser(result.sub)
         
         return user

    }catch(err){
        console.log(`Error in getsession : ${err}`)
    }
    
}