const items = [
  {
    name: "Laura Pérez",
    text:
      "Encontré a mi psicóloga en minutos. La plataforma es muy fácil de usar y todos los profesionales están verificados.",
  },
  {
    name: "Roberto Silva",
    text:
      "Como electricista, he triplicado mis clientes desde que me uní. La plataforma realmente funciona.",
  },
  {
    name: "Carmen López",
    text:
      "Excelente servicio. Pude agendar una cita con una nutricionista el mismo día que la necesitaba.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Lo que dicen nuestros usuarios
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="text-amber-600">★★★★★</div>
              <p className="mt-3 text-slate-700">“{t.text}”</p>
              <footer className="mt-4 text-sm font-semibold text-slate-600">
                {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
