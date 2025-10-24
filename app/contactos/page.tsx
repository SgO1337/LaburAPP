"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";
import { ContactRecord } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContactosClientPage() {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = storage.getAuth();
    if (!auth.isAuthenticated || !auth.user) {
      router.push("/login");
      return;
    }

    if (auth.user.type !== "client") {
      // not a client
      router.push("/");
      return;
    }

    const list = storage.getContactsForClient(auth.user.id);
    setContacts(list);
    setLoading(false);
  }, [router]);

  if (loading) return (
    <div className="min-h-screen bg-[rgb(248,250,252)] flex items-center justify-center">
      <div className="text-lg text-gray-600">Cargando contactos...</div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[rgb(248,250,252)] pt-[97px]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contactos enviados</h1>
              <p className="text-gray-600 mt-1">Mensajes que has enviado a profesionales</p>
            </div>
            <Link
              href="/search"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Buscar profesionales
            </Link>
          </div>

          {contacts.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-700">
              No has contactado a ningún profesional todavía. Usa el botón "Contactar" en los perfiles para enviar mensajes.
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((c) => (
                <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">{new Date(c.date).toLocaleString()}</div>
                      <div className="mt-1 font-medium text-gray-900">{c.professionalName}</div>
                    </div>
                    {c.professionalEmail ? (
                      <div className="text-sm text-slate-600">{c.professionalEmail}</div>
                    ) : null}
                  </div>
                  <p className="mt-3 text-gray-700">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
