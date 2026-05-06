import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <p className="text-muted-foreground">Connecté en tant que {user.email}</p>
      <form action={logout}>
        <Button variant="outline" type="submit">
          Se déconnecter
        </Button>
      </form>
    </div>
  );
}

export const metadata = {
  title: "Tableau de bord — SiteForge",
};
