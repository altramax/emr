import DashboardTemplate from "@/src/components/templates/dashboard/dashboard-template";
import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

const Page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }

  return <DashboardTemplate />;
};

export default Page;
