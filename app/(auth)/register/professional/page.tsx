"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { Professional } from "@/lib/types";
import { getAvatarUrl } from "@/lib/avatars";
import { useEffect } from "react";

// Prevent access if already logged in
// If user is authenticated, redirect to / or /dashboard depending on type
export default function RegisterProfessionalPage() {
  const router = useRouter();
  useEffect(() => {
    const auth = storage.getAuth();
    if (auth.isAuthenticated && auth.user) {
      if (auth.user.type === "professional") router.push("/dashboard");
      else router.push("/");
    }
  }, [router]);

  

const professions = [
  "Psicología",
  "Electricidad",
  "Nutrición",
  "Diseño",
  "Plomería",
  "Carpintería",
  "Fitness",
  "Mecánica",
  "Traducción",
  "Jardinería",
  "Contabilidad",
  "Fotografía",
  "Derecho",
  "Programación",
  "Masajes",
  "Pintura",
  "Gastronomía",
  "Veterinaria",
  "Marketing",
  "Peluquería",
  "Refrigeración",
  "Arquitectura",
  "Educación",
  "Limpieza",
  "Música",
  "Podología",
];

const availabilityOptions = ["Ahora", "Semana", "Finde", "Mañana", "Tarde", "Remoto"];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profession: "",
    role: "",
    location: "",
    bio: "",
    tags: "",
    rate: "",
    availability: [] as string[],
    experienceYears: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone || 
        !formData.profession || !formData.location || !formData.rate || 
        !formData.experienceYears) {
      setError("Todos los campos obligatorios deben completarse");
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

    // Create new professional
    const newProfessional: Professional = {
      id: `prof_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      type: "professional",
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      profession: formData.profession,
      role: formData.role,
      location: formData.location,
      bio: formData.bio || "Profesional registrado en LaburAPP",
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      rate: parseInt(formData.rate),
      availability: formData.availability,
      verified: false, // New professionals start unverified
      rating: 0,
      reviews: 0,
      experienceYears: parseInt(formData.experienceYears),
      img: getAvatarUrl(formData.name), // Generate avatar based on name
      createdAt: new Date().toISOString(),
    };

    // Save to storage
    storage.addUser(newProfessional);

    // Auto-login
    storage.setAuth({ isAuthenticated: true, user: newProfessional });

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  const toggleAvailability = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(option)
        ? prev.availability.filter((a) => a !== option)
        : [...prev.availability, option],
    }));
  };

  return (
    <main className="min-h-screen bg-[rgb(248,250,252)] px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/register"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <span aria-hidden className="text-xl">←</span> Volver
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Registro de Profesional</h1>
            <p className="mt-2 text-sm text-slate-600">
              Ofrece tus servicios y conecta con clientes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="María González"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="maria@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña *
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
                  Teléfono *
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                  Profesión *
                </label>
                <select
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                >
                  <option value="">Selecciona una profesión</option>
                  {professions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Título/Especialidad
                </label>
                <input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="Ej: Psicólogo Clínico"
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación *
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

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="Cuéntanos sobre tu experiencia y servicios..."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Especialidades (separadas por comas)
              </label>
              <input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                placeholder="Ej: Ansiedad, Depresión, Terapia de Pareja"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
                  Tarifa por hora (UYU) *
                </label>
                <input
                  id="rate"
                  type="number"
                  min="0"
                  value={formData.rate}
                  onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="15000"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Años de experiencia *
                </label>
                <input
                  id="experience"
                  type="number"
                  min="0"
                  max="50"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  placeholder="5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilidad
              </label>
              <div className="flex flex-wrap gap-2">
                {availabilityOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleAvailability(option)}
                    className={`rounded-full px-4 py-2 text-sm ring-1 transition ${
                      formData.availability.includes(option)
                        ? "bg-brand-blue text-white ring-brand-blue"
                        : "bg-white text-slate-700 ring-gray-200 hover:bg-slate-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
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
              {loading ? "Registrando..." : "Crear cuenta profesional"}
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
