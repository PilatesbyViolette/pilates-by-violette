import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { login } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

interface LoginPageProps {
  searchParams: { registered?: string; error?: string };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect("/dashboard");

  const errorMessage =
    searchParams.error === "auth_callback_failed"
      ? "Une erreur est survenue lors de l'authentification."
      : undefined;

  return (
    <>
      {searchParams.registered && (
        <div className="fixed left-1/2 top-4 -translate-x-1/2 rounded-md bg-green-500/10 px-4 py-2 text-sm text-green-700 dark:text-green-400">
          Compte créé ! Vérifiez votre e-mail puis connectez-vous.
        </div>
      )}
      <AuthForm mode="login" action={login} errorMessage={errorMessage} />
    </>
  );
}

export const metadata = {
  title: "Connexion — SiteForge",
};
