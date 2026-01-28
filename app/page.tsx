// app/page.tsx
import Entrance from "../components/Entrance";
import Services from "../components/Services";
import Navbar from "../components/Navbar";
import routesData from "../data/routes.json";
import Strengths from "../components/Strengths";
import Hero from "../components/Hero";
import Warehousing from "../components/Warehousing";
import WarehousingList from "../components/WarehousingList";
import Gallery from "../components/Gallery";
import FulfillmentFirst from "../components/FulfillmentFirst";
import FulfillmentSecond from "../components/FulfillmentSecond";
import FulfillmentThird from "../components/FulfillmentThird";
import Transloading from "../components/Transloading";
import WeServe from "../components/WeServe";
import Transboarding from "../components/Transboarding";
import Hall from "@/components/Hall";
import Reviews from "@/components/Reviews";
import Storage from "@/components/Storage";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import Form from "@/components/Form";
import Subscription from "@/components/Subscription";

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
        <section
          className="h-screen snap-start flex justify-center items-center section"
          id="individual"
        >
          <Storage />
        </section>

        <section
          className="h-screen snap-start flex justify-center items-center section bg-gray-200"
          id="events"
        >
          <Hall />
        </section>

        <section
          className="h-screen snap-start flex justify-center items-center section bg-white"
          id="reviews"
        >
          <Reviews />
        </section>
        <section
          className="h-screen snap-start flex justify-center items-center section bg-gray-200"
          id="partners"
        >
          <Partners />
        </section>

        <section
          className="h-screen snap-start flex justify-center items-center section bg-white"
          id="form"
        >
          <Form />
        </section>
        <section
          className="h-screen snap-start flex justify-center items-center section "
          id="values"
        >
          <Subscription />
        </section>
        <section className="h-screen snap-start section" id="let-us-talk">
          <Footer />
        </section>
      </div>
    </main>
  );
}
