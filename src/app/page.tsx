import { getSession } from "@/lib/getUserSession";
import Homepage from "@/pages/home";


const page = async () => {
  const session = await getSession();
  return (
    <div>
      <Homepage email={session?.user?.email} />
    </div>
  );
};

export default page;
