import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">¿Listo para conectar?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600">
          Únete a miles de usuarios que confían en LaburAPP para encontrar los mejores profesionales.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/register"
            className="rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white hover:bg-brand-deep-blue"
          >
            Únete como profesional
          </Link>
        </div>
      </div>
    </section>
  );
}
