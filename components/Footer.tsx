// app/components/Footer.tsx
import Link from "next/link";
import data from "../data/footer.json";

type FooterSection = {
  title: string;
  items: string[];
};

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 md:py-16 md:h-screen flex flex-col justify-end h-full">
      {/* Top Section - Title */}
      <div className="flex-1 flex items-end justify-center md:justify-start mx-4 md:mx-15 ml-10 mx-6 md:ml-56">
        <div className="text-lg md:text-4xl font-semibold leading-snug max-w-4xl mx-auto md:mx-0 text-center text-left inter-bold">
          <h2 className="mr-40 md:mr-0">
            Starting a new project or looking for a new partner?{" "}
          </h2>
          <Link className="underline text-[#045804]" href="#form">
            Let&apos;s talk
          </Link>{" "}
          &gt; <span>info@lynx3pl.com</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-white my-6 w-full md:my-0 md:mt-10"></div>

      {/* Bottom Section - Footer Links */}
      <div className="basis-1/4 px-2 md:px-6 md:ml-10 mx-8 md:pt-10">
        <div
          className="
            grid grid-cols-2 md:grid-cols-4 
            text-[0.5em] md:text-sm 
            text-left md:text-left 
            gap-2 md:gap-20
            md:ml-40
          "
        >
          {(data as FooterSection[]).map((section, index) => (
            <div key={index}>
              <h3 className="text-sm md:text-lg font-bold mb-3 inter-bold">
                {section.title}
              </h3>
              <ul className="inter-medium">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="hover:underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}