"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { Client } from "@/lib/types";
import { useEffect } from "react";

// Prevent access if already logged in
// If user is authenticated, redirect to / or /dashboard depending on type
export default function RegisterClientPage() {
  const router = useRouter();
  useEffect(() => {
    const auth = storage.getAuth();
    if (auth.isAuthenticated && auth.user) {
      if (auth.user.type === "professional") router.push("/dashboard");
      else router.push("/");
    }
  }, [router]);

  

  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.location) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    // Check if email already exists
    if (storage.emailExists(formData.email)) {
      setError("Este email ya está registrado");
      setLoading(false);
      return;
    }

    // Create new client
    const newClient: Client = {
      id: `client_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      type: "client",
      ...formData,
      createdAt: new Date().toISOString(),
    };

    // Save to storage
    storage.addUser(newClient);

    // Auto-login
    storage.setAuth({ isAuthenticated: true, user: newClient });

    // Redirect to home
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[rgb(248,250,252)] px-4 py-16">
      <div className="mx-auto max-w-md">
        <Link
          href="/register"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <span aria-hidden className="text-xl">←</span> Volver
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Registro de Cliente</h1>
            <p className="mt-2 text-sm text-slate-600">
              Encuentra profesionales para tus proyectos
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="juan@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="099 123 456"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación
              </label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              >
                <option value="">Selecciona tu ubicación</option>
                <option value="Montevideo">Montevideo</option>
                <option value="Canelones">Canelones</option>
                <option value="Maldonado">Maldonado</option>
                <option value="Colonia">Colonia</option>
                <option value="Salto">Salto</option>
                <option value="Paysandú">Paysandú</option>
                <option value="San José">San José</option>
                <option value="Rivera">Rivera</option>
                <option value="Rocha">Rocha</option>
                <option value="Tacuarembó">Tacuarembó</option>
              </select>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-blue px-4 py-3 font-semibold text-white hover:bg-brand-deep-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold text-brand-blue hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
