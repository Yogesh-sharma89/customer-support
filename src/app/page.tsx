import { getSession } from "@/lib/getUserSession";
import Homepage from "@/pages/home";
export const dynamic = "force-dynamic";

const page = async () => {
  const session = await getSession();

  const email: string | null = session?.user?.email ?? null;

  return (
    <div>
      <Homepage email={email} />
    </div>
  );
};

export default page;
