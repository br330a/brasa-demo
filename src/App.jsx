import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import MenuPreview from "./components/MenuPreview.jsx";
import Story from "./components/Story.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main id="conteudo">
        <Hero />
        <MenuPreview />
        <Story />
      </main>
      <Footer />
    </>
  );
}
