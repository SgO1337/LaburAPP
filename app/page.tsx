import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Professionals from "@/components/Professionals";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-[73px]">
        <Hero />
        <Professionals />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
