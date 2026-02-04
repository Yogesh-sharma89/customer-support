import { getSession } from "@/lib/getUserSession";
import Homepage from "@/pages/home";


const page = async () => {
  const session = await getSession();
  if(!session?.user?.email){
    throw new Error('Email not found')
  }
  return (
    <div>
      <Homepage email={session?.user?.email} />
    </div>
  );
};

export default page;
