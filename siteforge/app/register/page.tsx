import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { register } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function RegisterPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  return <AuthForm mode="register" action={register} />;
}

export const metadata = {
  title: "Inscription — SiteForge",
};
