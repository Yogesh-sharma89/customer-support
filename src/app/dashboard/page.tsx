import DashboardClient from "@/components/DashboardClient";
import { getSession } from "@/lib/getUserSession"


const DashboardPage = async() => {
    const session = await getSession();

    if(!session?.user?.id){
        throw new Error("User not authenticated")
    }
  return (
    <>
      <DashboardClient id = {session?.user?.id}/>
    </>
  )
}

export default DashboardPage
