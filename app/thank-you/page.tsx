// app/thank-you/page.tsx
import FloatingButton from "../../components/WhatsappIcon";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ThankYou from "../../components/ThankYou";
import routesData from "../../data/routes.json";

export default function ThankYouPage() {
  return (
    <main className="relative">
      <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-container">
        <Navbar title="Lynx 3PL" routes={routesData} />
        
        <section className="h-screen snap-start flex justify-center items-center section">
          <ThankYou />
        </section>
        
        <section className="h-screen snap-start section">
          <Footer />
        </section>
      </div>
      
      <FloatingButton />
    </main>
  );
}