const steps = [
  {
    n: "1",
    title: "Busca",
    text:
      "Encuentra el profesional que necesitas usando nuestros filtros de búsqueda.",
  },
  {
    n: "2",
    title: "Conecta",
    text:
      "Revisa perfiles, calificaciones y contacta directamente con el profesional.",
  },
  {
    n: "3",
    title: "Contrata",
    text:
      "Agenda tu cita y recibe el servicio de forma rápida y confiable.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">Cómo funciona</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Conectar con profesionales nunca fue tan fácil.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-lg font-bold text-white">
                {s.n}
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
