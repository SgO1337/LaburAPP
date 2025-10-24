import Link from "next/link";
import ProfessionalCard from "./ProfessionalCard";

const professionals = [
  {
    name: "María González",
    role: "Psicóloga Clínica",
    rating: 4.9,
    reviews: 127,
    tags: ["Ansiedad", "Depresión", "Terapia de Pareja"],
    img: "/professionals/maria_gonzalez_psicologa.jpeg",
    verified: true,
  },
  {
    name: "Carlos Rodríguez",
    role: "Electricista",
    rating: 4.8,
    reviews: 89,
    tags: ["Instalaciones", "Reparaciones", "Emergencias"],
    img: "/professionals/carlos_rodriguez_electricista.jpeg",
    verified: true,
  },
  {
    name: "Ana Martínez",
    role: "Nutricionista",
    rating: 5.0,
    reviews: 156,
    tags: ["Pérdida de peso", "Nutrición deportiva", "Diabetes"],
    img: "/professionals/ana_martinez_nutricionista.jpeg",
    verified: true,
  },
];

export default function Professionals() {
  return (
    <section id="profesionales" className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold sm:text-4xl">Profesionales destacados</h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Todos nuestros profesionales están verificados y cuentan con las certificaciones necesarias.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {professionals.map((p) => (
            <ProfessionalCard key={p.name} {...p} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">¿No encuentras lo que necesitas?</p>
          <Link
            href="/search"
            className="inline-block rounded-lg bg-brand-blue px-6 py-3 text-base font-semibold text-white hover:bg-brand-deep-blue transition"
          >
            Buscar más profesionales
          </Link>
        </div>
      </div>
    </section>
  );
}
