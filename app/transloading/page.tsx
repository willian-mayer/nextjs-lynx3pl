// app/transloading/page.tsx
import FloatingButton from "../../components/WhatsappIcon";
import Footer from "../../components/Footer";
import Form from "../../components/Form";
import Navbar from "../../components/Navbar";
import Transloading from "../../components/Transloading";
import routesData from "../../data/routes.json";

export default function TransloadingPage() {
  return (
    <main className="relative">
      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-container">
        <Navbar title="Lynx 3PL" routes={routesData} />

        <section className="h-screen snap-start flex justify-center items-center section">
          <Transloading />
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
