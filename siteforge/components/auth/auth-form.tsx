"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  mode: "login" | "register";
  action: (formData: FormData) => Promise<{ error: string } | undefined>;
  errorMessage?: string;
}

export function AuthForm({ mode, action, errorMessage }: AuthFormProps) {
  const [isPending, startTransition] = useTransition();

  const isLogin = mode === "login";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await action(formData);
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin
              ? "Entrez vos identifiants pour accéder à votre espace"
              : "Renseignez vos informations pour créer un compte"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse e-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="vous@exemple.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={isLogin ? "••••••••" : "8 caractères minimum"}
              required
              minLength={8}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {errorMessage && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? isLogin
                ? "Connexion…"
                : "Création…"
              : isLogin
                ? "Se connecter"
                : "Créer mon compte"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Pas encore de compte ?{" "}
              <Link
                href="/register"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                S&apos;inscrire
              </Link>
            </>
          ) : (
            <>
              Déjà un compte ?{" "}
              <Link
                href="/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Se connecter
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
