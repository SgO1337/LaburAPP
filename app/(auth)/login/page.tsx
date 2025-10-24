// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = storage.getAuth();
    if (auth.isAuthenticated && auth.user) {
      // Already logged in -> redirect appropriately
      if (auth.user.type === "professional") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Por favor completa todos los campos");
      setLoading(false);
      return;
    }

    const result = storage.login(formData.email, formData.password);

    if (!result.success) {
      setError(result.error || "Error al iniciar sesión");
      setLoading(false);
      return;
    }

    // Redirect based on user type
    setTimeout(() => {
      if (result.user?.type === "professional") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[rgb(248,250,252)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base text-gray-500 hover:text-gray-700 mb-6"
        >
          <span aria-hidden className="text-xl">←</span> Volver al inicio
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <img src="/laburapp-icon-clean.svg" alt="LaburAPP Logo" className="h-10 w-10" />
          <span className="text-2xl font-semibold text-gray-900">LaburAPP</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
        <p className="text-gray-600 mt-2">Ingresa tus credenciales para continuar</p>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="tu@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                <span className="text-gray-600">Recuérdame</span>
              </label>
              <button 
                type="button" 
                className="text-brand-blue hover:underline"
                onClick={() => alert("Funcionalidad en desarrollo")}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-blue px-4 py-3 text-base font-semibold text-white hover:bg-brand-deep-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/register" className="font-medium text-brand-blue hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </main>
  );
}
