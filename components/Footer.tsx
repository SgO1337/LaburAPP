// Footer links are intentionally non-navigating (mock buttons)

export default function Footer() {
  return (
    <footer className="border-t bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <img src="/laburapp-icon-clean.svg" alt="LaburAPP Logo" className="h-6 w-6" />
              <span>LaburAPP</span>
            </div>
            <p className="text-sm text-slate-600">
              La plataforma que conecta profesionales con clientes de forma rápida y confiable.
            </p>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Para Clientes</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button type="button" className="hover:underline text-left">Buscar profesionales</button></li>
              <li><button type="button" className="hover:underline text-left">Cómo funciona</button></li>
              <li><button type="button" className="hover:underline text-left">Preguntas frecuentes</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Para Profesionales</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button type="button" className="hover:underline text-left">Únete a la plataforma</button></li>
              <li><button type="button" className="hover:underline text-left">Beneficios</button></li>
              <li><button type="button" className="hover:underline text-left">Recursos</button></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold">Soporte</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><button type="button" className="hover:underline text-left">Centro de ayuda</button></li>
              <li><button type="button" className="hover:underline text-left">Contacto</button></li>
              <li><button type="button" className="hover:underline text-left">Términos y condiciones</button></li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-slate-500">© 2025 LaburAPP. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
