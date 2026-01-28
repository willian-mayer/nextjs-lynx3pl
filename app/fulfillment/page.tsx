// app/fulfillment/page.tsx
import Hero from "../../components/Hero";
import FulfillmentFirst from "../../components/FulfillmentFirst";
import FulfillmentSecond from "../../components/FulfillmentSecond";
import FulfillmentThird from "../../components/FulfillmentThird";
import WeServe from "../../components/WeServe";
import Transboarding from "../../components/Transboarding";
import Gallery from "../../components/Gallery";
import Navbar from "../../components/Navbar";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/WhatsappIcon";
import routesData from "../../data/routes.json";
import Subscription from "@/components/Subscription";

export default function FulfillmentPage() {
  return (
    <main className="relative">
      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-container">
        <Navbar title="Lynx 3PL" routes={routesData} />

        <section className="h-screen snap-start flex justify-center items-center section">
          <Hero />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section bg-gray-200">
          <FulfillmentFirst />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section">
          <FulfillmentSecond />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section bg-gray-200">
          <WeServe />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section">
          <Transboarding />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section bg-gray-200">
          <Gallery />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section">
          <FulfillmentThird />
        </section>

        <section
          className="h-screen snap-start flex justify-center items-center section"
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
        <section className="h-screen snap-start section">
          <Footer />
        </section>
      </div>
      
      <FloatingButton />
    </main>
  );
}