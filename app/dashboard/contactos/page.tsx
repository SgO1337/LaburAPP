"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";

export default function ContactosPage() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const auth = storage.getAuth();
    setIsAuthed(!!auth && auth.isAuthenticated && auth.user?.type === "professional");
  }, []);

  const staticContacts = [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      mensaje: "Hola, me interesa un presupuesto para una instalación eléctrica en mi cocina.",
      fecha: "2025-05-09",
    },
    {
      id: 2,
      nombre: "María García",
      email: "maria.garcia@example.com",
      mensaje: "¿Podés venir mañana a la tarde para revisar una pérdida de agua?",
      fecha: "2025-05-08",
    },
    {
      id: 3,
      nombre: "Carlos López",
      email: "carlos.lopez@example.com",
      mensaje: "Necesito cambiar 3 enchufes y revisar el tablero. ¿Costo aproximado?",
      fecha: "2025-05-06",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(248,250,252)] pt-[97px]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contactos</h1>
              <p className="text-gray-600 mt-1">Mensajes recibidos (estático, de ejemplo)</p>
            </div>
            <Link
              href="/dashboard"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Volver al dashboard
            </Link>
          </div>

          {!isAuthed && (
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
              Debes iniciar sesión como profesional para ver tus contactos. Esta página es solo un ejemplo estático.
            </div>
          )}

          <div className="space-y-4">
            {staticContacts.map((c) => (
              <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-gray-500">{c.fecha}</div>
                    <div className="mt-1 font-medium text-gray-900">
                      {c.nombre} <span className="text-gray-500">•</span> <span className="text-sm">{c.email}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{c.mensaje}</p>
                <div className="mt-4 flex gap-2">
                  <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition">
                    Responder
                  </button>
                  <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                    Marcar como visto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
