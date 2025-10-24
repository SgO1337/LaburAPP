import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata = {
  title: "LaburAPP — Conecta con profesionales verificados",
  description:
    "La plataforma digital que une a profesionales independientes con clientes. Rápido, confiable y verificado.",
  icons: {
    icon: "/laburapp-icon-final.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-dvh bg-background text-slate-800 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
