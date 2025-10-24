"use client";

import { useState } from "react";
import { storage } from "@/lib/storage";

type Props = {
  professionalId: string;
  professionalName: string;
  onClose: () => void;
  onSent?: () => void;
};

export default function ContactModal({ professionalId, professionalName, onClose, onSent }: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = storage.getAuth();

  const handleSend = () => {
    if (!auth.isAuthenticated || !auth.user || auth.user.type !== "client") {
      alert("Debes iniciar sesión como cliente para enviar mensajes.");
      return;
    }

    if (!message.trim()) {
      return;
    }

    setLoading(true);

    storage.addContact({
      clientId: auth.user.id,
      professionalId,
      professionalName,
      professionalEmail: undefined,
      message: message.trim(),
      date: new Date().toISOString(),
    });

    setLoading(false);
    onSent && onSent();
    onClose();
    // Message saved; parent will update UI. No browser alert to keep UX clean.
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contactar a {professionalName}</h3>
            <p className="text-sm text-gray-600 mt-1">Envía un mensaje directo al profesional</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
            placeholder="Escribe un mensaje breve y claro sobre lo que necesitas..."
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            disabled={loading}
            className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep-blue disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </div>
    </div>
  );
}
