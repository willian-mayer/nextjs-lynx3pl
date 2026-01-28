// app/space-rental/page.tsx
import Storage from "../../components/Storage";
import Hall from "../../components/Hall";
import Navbar from "../../components/Navbar";
import routesData from "../../data/routes.json";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import FloatingButton from "../../components/WhatsappIcon";

export default function SpaceRentalPage() {
  return (
    <main className="relative">
      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-container">
        <Navbar title="Lynx 3PL" routes={routesData} />
        
        <section className="h-screen snap-start flex justify-center items-center section">
          <Storage />
        </section>

        <section className="h-screen snap-start flex justify-center items-center section bg-gray-200">
          <Hall />
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