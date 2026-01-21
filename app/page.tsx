// app/page.tsx
import Entrance from "./components/Entrance";
import Services from "./components/Services";
import Navbar from "./components/Navbar";
import routesData from "./data/routes.json";

export default function Home() {
  return (
    <main className="relative">
      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-container">
        {/* Entrance - pantalla completa sin navbar */}
        <section className="h-screen snap-start flex justify-center items-center section">
          <Entrance />
        </section>

        {/* Navbar aparece después del scroll */}
        <Navbar title="Lynx 3PL" routes={routesData} />

        {/* Services y resto de componentes */}
        <section className="snap-start w-full min-h-screen flex justify-center items-center section">
          <Services />
        </section>
      </div>
    </main>
  );
}