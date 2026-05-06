import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function BuilderPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Builder</h1>
      <p className="text-muted-foreground">
        Éditeur de site — à venir
      </p>
    </div>
  );
}

export const metadata = {
  title: "Builder — SiteForge",
};
