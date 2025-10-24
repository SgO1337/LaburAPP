"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { Professional } from "@/lib/types";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Professional>>({});

  useEffect(() => {
    const auth = storage.getAuth();
    
    if (!auth.isAuthenticated || !auth.user) {
      router.push("/login");
      return;
    }

    if (auth.user.type !== "professional") {
      router.push("/");
      return;
    }

    setUser(auth.user as Professional);
    setFormData(auth.user as Professional);
    setLoading(false);
  }, [router]);

  const handleUpdate = () => {
    if (!user) return;

    const updates: Partial<Professional> = {
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio,
      tags: formData.tags,
      rate: formData.rate,
      availability: formData.availability,
    };

    storage.updateUser(user.id, updates as any);
    
    // Refresh user data
    const updatedUser = storage.getUserById(user.id) as Professional;
    setUser(updatedUser);
    storage.setAuth({ isAuthenticated: true, user: updatedUser });
    
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[rgb(248,250,252)] flex items-center justify-center">
        <div className="text-lg text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(248,250,252)] pt-[97px]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
              <p className="text-gray-600 mt-1">Gestiona tu perfil profesional</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/dashboard/contactos"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Ver contactos
              </a>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="text-sm font-medium text-gray-500 mb-1">Calificación</div>
              <div className="text-2xl font-bold text-gray-900">{user.rating.toFixed(1)}</div>
              <div className="text-xs text-gray-500 mt-1">{user.reviews} reseñas</div>
            </div>
            
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="text-sm font-medium text-gray-500 mb-1">Tarifa</div>
              <div className="text-2xl font-bold text-gray-900">${user.rate}</div>
              <div className="text-xs text-gray-500 mt-1">por hora</div>
            </div>
            
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="text-sm font-medium text-gray-500 mb-1">Experiencia</div>
              <div className="text-2xl font-bold text-gray-900">{user.experienceYears}</div>
              <div className="text-xs text-gray-500 mt-1">años</div>
            </div>
            
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="text-sm font-medium text-gray-500 mb-1">Estado de verificación</div>
              <div className="flex items-center gap-2 mt-2">
                {user.verified ? (
                  <>
                    <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium text-green-700">Verificado</span>
                  </>
                ) : (
                  <>
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-500"></span>
                    <span className="text-sm font-medium text-yellow-700">Pendiente</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Información del Perfil</h2>
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep-blue transition"
                >
                  Editar Perfil
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(false);
                      setFormData(user);
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep-blue transition"
                  >
                    Guardar Cambios
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                ) : (
                  <p className="text-gray-900">{user.name}</p>
                )}
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                ) : (
                  <p className="text-gray-900">{user.phone}</p>
                )}
              </div>

              {/* Profession (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profesión</label>
                <p className="text-gray-900">{user.profession}</p>
              </div>

              {/* Role (read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rol</label>
                <p className="text-gray-900">{user.role}</p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                ) : (
                  <p className="text-gray-900">{user.location}</p>
                )}
              </div>

              {/* Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa ($/hora)</label>
                {editing ? (
                  <input
                    type="number"
                    value={formData.rate || ""}
                    onChange={(e) => setFormData({ ...formData, rate: parseInt(e.target.value) })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                ) : (
                  <p className="text-gray-900">${user.rate}</p>
                )}
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                {editing ? (
                  <textarea
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                ) : (
                  <p className="text-gray-900">{user.bio}</p>
                )}
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Etiquetas {editing && <span className="text-xs text-gray-500">(separadas por comas)</span>}
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.tags?.join(", ") || ""}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.tags.map((tag, i) => (
                      <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidad</label>
                <div className="flex flex-wrap gap-2">
                  {user.availability.map((slot, i) => (
                    <span key={i} className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
