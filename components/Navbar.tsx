"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { User } from "@/lib/types";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const auth = storage.getAuth();
    setUser(auth.user || null);
  }, []);

  const handleLogout = () => {
    storage.logout();
    setUser(null);
    router.push("/");
  };

  const forceAuthLinks = pathname?.startsWith("/login") || pathname?.startsWith("/register");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex w-full items-center justify-between px-8 py-4 lg:px-12">
        {/* Logo - Left */}
        {!user || forceAuthLinks ? (
          <Link href="/" className="flex items-center gap-2.5 text-lg font-semibold">
            <img src="/laburapp-icon-clean.svg" alt="LaburAPP Logo" className="h-8 w-8" />
            <span className="text-slate-900">LaburAPP</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2.5 text-lg font-semibold opacity-90 cursor-default">
            <img src="/laburapp-icon-clean.svg" alt="LaburAPP Logo" className="h-8 w-8" />
            <span className="text-slate-900">LaburAPP</span>
          </div>
        )}

        {/* Auth Buttons - Right */}
        <div className="flex items-center gap-3">
          {forceAuthLinks ? (
            <>
              <Link 
                href="/login"
                className="rounded-lg border px-4 py-2.5 text-base"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/register"
                className="rounded-lg bg-brand-blue px-4 py-2.5 text-base font-semibold text-white hover:bg-brand-deep-blue"
              >
                Registrarse
              </Link>
            </>
          ) : user ? (
            <>
              <span className="text-sm text-gray-600">
                Hola, <span className="font-semibold text-gray-900">{user.name}</span>
              </span>
              {user.type === "professional" && (
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Dashboard
                </Link>
              )}
              {user.type === "client" && (
                <>
                  <Link
                    href="/search"
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Buscar profesionales
                  </Link>
                  <Link
                    href="/contactos"
                    className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Contactos
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login"
                className="rounded-lg border px-4 py-2.5 text-base"
              >
                Iniciar Sesión
              </Link>
              <Link 
                href="/register"
                className="rounded-lg bg-brand-blue px-4 py-2.5 text-base font-semibold text-white hover:bg-brand-deep-blue"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
