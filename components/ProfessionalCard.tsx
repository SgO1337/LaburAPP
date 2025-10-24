"use client";

import { useRouter } from "next/navigation";
import { getAvatarUrl } from "@/lib/avatars";
import { storage } from "@/lib/storage";
import { useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";

type Props = {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  tags: string[];
  img?: string;
  verified?: boolean;
  hideImage?: boolean;
};

export default function ProfessionalCard({
  name,
  role,
  rating,
  reviews,
  tags,
  img,
  verified,
  hideImage,
}: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sentRecently, setSentRecently] = useState(false);

  useEffect(() => {
    const auth = storage.getAuth();
    if (!auth.isAuthenticated || !auth.user || auth.user.type !== "client") return;
    const contacts = storage.getContactsForClient(auth.user.id);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const recent = contacts.some((c) => c.professionalId === name && (now - new Date(c.date).getTime()) < oneDay);
    setSentRecently(recent);
  }, [name]);
  
  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col h-full min-w-[280px] max-w-[340px]">
      <div className="flex items-center gap-4">
        {!hideImage ? (
          <img
            src={getAvatarUrl(name, img)}
            alt={`Foto de ${name}`}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="h-16 w-16 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-lg font-semibold"
            title={name}
          >
            {initials}
          </div>
        )}
        <div className="flex flex-col justify-center h-16 min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="truncate text-lg font-semibold max-w-full">{name}</span>
            {verified && (
              <span
                className="inline-flex items-center justify-center ml-1"
                title="Verificado"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="text-emerald-600"
                >
                  <circle cx="12" cy="12" r="9" className="fill-none stroke-current" strokeWidth="2" />
                  <path
                    d="M8.5 12.5l2.3 2.3L16 10"
                    className="fill-none stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </div>
          <div className="whitespace-normal break-words text-sm text-slate-600 font-normal mt-0.5">{role}</div>
          <div className="text-sm text-amber-600 text-left mt-0.5">
            ★ {rating} <span className="text-slate-500">({reviews} reseñas)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-hidden whitespace-nowrap">
        {tags.slice(0, 2).map((t) => (
          <span
            key={t}
            className="rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-700 ring-1 ring-emerald-200 truncate"
          >
            {t}
          </span>
        ))}
      </div>

      {sentRecently ? (
        <button
          disabled
          className="mt-4 w-full rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-600 cursor-not-allowed"
          title="Ya contactaste a este profesional recientemente"
        >
          Ya contactado recientemente
        </button>
      ) : (
        <button
          onClick={() => {
            const auth = storage.getAuth();

            if (!auth.isAuthenticated || !auth.user) {
              router.push("/login");
              return;
            }

            if (auth.user.type !== "client") {
              alert("Solo cuentas de cliente pueden contactar a profesionales.");
              return;
            }

            setOpen(true);
          }}
          className="mt-4 w-full rounded-lg bg-brand-blue px-4 py-2 font-medium text-white hover:bg-brand-deep-blue"
        >
          Contactar
        </button>
      )}

      {open && (
        <ContactModal
          professionalId={name}
          professionalName={name}
          onClose={() => setOpen(false)}
          onSent={() => { setSentRecently(true); }}
        />
      )}
    </article>
  );
}
