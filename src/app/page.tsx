import AuthenticationTemplate from "@/src/components/templates/authentication/authentication-template";
import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/dashboard");
  }

  return <AuthenticationTemplate />;
}
