import Navbar from "@/components/Navbar";

export const metadata = {
  title: "LaburAPP — Autenticación",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">{/* space for fixed navbar */}
        {children}
      </main>
    </>
  );
}
