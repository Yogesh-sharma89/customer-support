import { getSession } from "@/lib/getUserSession";
import Homepage from "@/pages/home";
export const dynamic = "force-dynamic";


const page = async () => {
  const session = await getSession();
  if(!session?.user?.email){
    return null;
  }
  return (
    <div>
      <Homepage email={session?.user?.email} />
    </div>
  );
};

export default page;
