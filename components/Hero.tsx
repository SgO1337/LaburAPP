import Link from "next/link";
import Badges from "./Badges";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-12 sm:pt-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-16 text-center sm:py-20">
        <h1 className="text-pretty text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Conecta con <span className="text-brand-blue">profesionales</span>{" "}
          <span className="text-brand-blue">verificados</span> en minutos
        </h1>

        <p className="max-w-3xl text-lg text-slate-600">
          La plataforma digital que une a profesionales independientes con clientes que
          necesitan sus servicios. Rápido, confiable y verificado.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-5 py-3 font-semibold text-white hover:bg-brand-deep-blue"
          >
            Buscar Profesionales
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-semibold"
          >
            Únete como Profesional
          </Link>
        </div>

        <Badges />
      </div>
    </section>
  );
}
