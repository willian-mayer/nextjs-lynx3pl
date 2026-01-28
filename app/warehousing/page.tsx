// app/warehousing/page.tsx
import Warehousing from "../../components/Warehousing";
import WarehousingList from "../../components/WarehousingList";
import Gallery from "../../components/Gallery";
import Navbar from "../../components/Navbar";
import routesData from "../../data/routes.json";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/WhatsappIcon";

export default function WarehousingPage() {
  return (
    <main className="relative">
      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-container">
        <Navbar title="Lynx 3PL" routes={routesData} />

        <section className="h-screen snap-start flex justify-center items-center section">
          <Warehousing />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section bg-gray-200">
          <WarehousingList />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section">
          <Gallery />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section" id="form">
          <Form />
        </section>

        <section className="h-screen snap-start section">
          <Footer />
        </section>
      </div>
      
      <FloatingButton />
    </main>
  );
}