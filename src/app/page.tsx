import { getSession } from "@/lib/getUserSession";
import Homepage from "@/pages/home";


const page = async () => {
  const session = await getSession();
  if(!session?.user?.email){
    return null;
  }
  return (
    <div>
      {session.user.email && <Homepage email={session?.user?.email} />}
    </div>
  );
};

export default page;
