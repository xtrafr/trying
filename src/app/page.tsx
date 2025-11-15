import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import ExpertiseCarousel from "@/sections/ExpertiseCarousel";
import Projects from "@/sections/Projects";
import About from "@/sections/About";
import ContactNew from "@/sections/ContactNew";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import SettingsMenu from "@/components/SettingsMenu";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Preloader />
      <Navbar />
      <main className="relative" tabIndex={-1}>
        <Hero />
        <ExpertiseCarousel />
        <Projects />
        <About />
        <ContactNew />
      </main>
      <Footer />
      <SettingsMenu />
    </>
  );
}