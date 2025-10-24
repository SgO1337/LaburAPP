"use client";

// app/(auth)/register/page.tsx
import Link from "next/link";
import { useEffect } from "react";
import { storage } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  useEffect(() => {
    const auth = storage.getAuth();
    if (auth.isAuthenticated && auth.user) {
      if (auth.user.type === "professional") router.push("/dashboard");
      else router.push("/");
    }
  }, [router]);

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

      <h1 className="text-3xl font-bold text-gray-900">Registrarse</h1>
      <p className="text-gray-600 mt-2">Selecciona tu tipo de cuenta para continuar</p>

      <div className="mt-8 grid gap-4">
        <Link
          href="/register/client"
          className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
        >
          <div className="flex items-center gap-4">
            <span className="grid place-items-center h-12 w-12 rounded-full bg-blue-50 text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="fill-none stroke-current">
                <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" strokeWidth="1.8" />
                <path d="M4 21a8 8 0 1 1 16 0" strokeWidth="1.8" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Soy Cliente</h2>
              <p className="text-sm text-gray-600">Busco profesionales para mis necesidades</p>
            </div>
            <span className="ml-auto text-gray-400 group-hover:text-blue-600" aria-hidden>
              ›
            </span>
          </div>
        </Link>

        <Link
          href="/register/professional"
          className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition"
        >
          <div className="flex items-center gap-4">
            <span className="grid place-items-center h-12 w-12 rounded-full bg-emerald-50 text-emerald-600">
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="fill-none stroke-current">
                <rect x="3" y="7" width="18" height="12" rx="2" strokeWidth="1.8" />
                <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="1.8" />
                <path d="M3 12h18" strokeWidth="1.8" />
              </svg>
            </span>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Soy Profesional</h2>
              <p className="text-sm text-gray-600">Ofrezco mis servicios profesionales</p>
            </div>
            <span className="ml-auto text-gray-400 group-hover:text-emerald-600" aria-hidden>
              ›
            </span>
          </div>
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta? {" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </div>
  </main>
  );
}
