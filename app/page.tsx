import Entrance from "./components/Entrance";

export default function Home() {
  return (
      <main className="relative">
        <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-container">
        <section className="h-screen snap-start flex justify-center items-center section">
          <Entrance />
        </section>
        </div>
      </main>
  );
}
