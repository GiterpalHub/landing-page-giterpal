
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import Project from "@/components/sections/Project";
import Article from "@/components/sections/Article";

export default function Home() {
  return (
    <div className="w-full">
      <section id="hero">
        <Hero />
      </section>

      <section id="project">
        <Project />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="article">
        <Article />
      </section>
      
      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}