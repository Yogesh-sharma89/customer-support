import { getSession } from "@/lib/getUserSession";
import Homepage from "@/pages/home";
export const dynamic = "force-dynamic";
import {redirect} from 'next/navigation'

const page = async () => {
  const session = await getSession();
  if(!session?.user?.email){
    throw new Error('User not authenticated')
  }
  return (
    <div>
      <Homepage email={session.user.email} />
    </div>
  );
};

export default page;
