// app/page.tsx
import Entrance from "./components/Entrance";
import Services from "./components/Services";
import Navbar from "./components/Navbar";
import routesData from "./data/routes.json";
import Strengths from "./components/Strengths";
import Hero from "./components/Hero";
import Warehousing from "./components/Warehousing";
import WarehousingList from "./components/WarehousingList";
import Gallery from "./components/Gallery";
import FulfillmentFirst from "./components/FulfillmentFirst";
import FulfillmentSecond from "./components/FulfillmentSecond";
import FulfillmentThird from "./components/FulfillmentThird";
import Transloading from "./components/Transloading";
import WeServe from "./components/WeServe";
import Transboarding from "./components/Transboarding";

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
        <section
          className="h-screen snap-start flex justify-center items-center section bg-gray-200"
          id="why-us"
        >
          <Strengths />
        </section>
        <section
          className="h-screen snap-start flex justify-center items-center section "
          id="reliable-fulfillment"
        >
          <Hero />
        </section>
        <section
          className="h-screen snap-start flex justify-center items-center section bg-gray-200"
          id="warehousing"
        >
          <Warehousing />
        </section>
        <section
          className="h-screen snap-start flex justify-center items-center section "
          id="values"
        >
          <WarehousingList />
        </section>
        <section
          className="h-screen snap-start flex justify-center items-center section bg-gray-200"
          id="inventory"
        >
          <Gallery />
        </section>
        <section className="h-screen snap-start flex justify-center items-center section ">
          <FulfillmentFirst />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section bg-gray-200">
          <FulfillmentSecond />
        </section>

        <section
          className="h-screen snap-start flex justify-center items-center section "
          id="steps"
        >
          <FulfillmentThird />
        </section>
        <section
          className="h-screen snap-start flex justify-center items-center section bg-gray-200"
          id="transloading"
        >
          <Transloading  />
        </section>

        <section
          className="h-screen snap-start flex justify-center items-center section"
          id="we-serve"
        >
          <WeServe />
        </section>

        <section
          className="h-screen snap-start flex justify-center items-center section bg-gray-200"
          id="door-to-door"
        >
          <Transboarding />
        </section>
      </div>
    </main>
  );
}
