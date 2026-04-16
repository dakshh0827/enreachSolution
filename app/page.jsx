import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Features from "@/components/Features";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* Fixed animated background — renders below everything */}
      <BackgroundCanvas />

      {/* Fixed navigation */}
      <Navbar />

      {/* Page content — stacked above canvas via z-index */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Services />
        <Features />
        <Work />
        <Contact />
      </main>

      <Footer />
    </>
  );
}