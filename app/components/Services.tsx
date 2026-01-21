// app/components/Services.tsx
'use client';

import { motion, useInView } from "framer-motion";
import { useRef, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import services from "../data/services.json";

type Service = {
  title: string;
  route: string;
};

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="snap-start w-full min-h-screen px-2 sm:px-24 flex items-center justify-center pt-25 md:pt-16"
    >
      {/* Grid para móviles: imagen arriba, texto abajo */}
      <div className="grid grid-rows-[auto_auto] sm:flex sm:flex-col items-center justify-center gap-4 w-full h-full">
        
        {/* Imagen hero responsive con padding */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="w-full h-[50vh] sm:h-[50vh] md:h-[60vh] px-2 sm:px-8 md:px-24"
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            {/* Imagen para desktop (md y superior) */}
            <Image
              src="/services/service-md.png"
              alt="Services"
              fill
              className="object-cover hidden md:block"
              sizes="(max-width: 768px) 0vw, 100vw"
              priority
            />
            
            {/* Imagen para móvil */}
            <Image
              src="/services/service-xs.png"
              alt="Services"
              fill
              className="object-cover md:hidden"
              sizes="(max-width: 768px) 100vw, 0vw"
              priority
            />
          </div>
        </motion.div>

        {/* Lista de servicios */}
        <motion.div
          className="
            w-full 
            flex flex-col md:flex-row flex-wrap 
            justify-start md:justify-around 
            items-center
            px-2 sm:px-4 md:px-64
            z-10 relative rounded-lg
          "
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.8,
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {(services as Service[]).map((service, index) => (
            <Fragment key={service.title}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full sm:w-auto text-center"
              >
                <Link
                  href={service.route}
                  className="
                    inter-bold
                    font-bold text-black 
                    transition-transform duration-300 hover:scale-110 
                    text-base sm:text-lg md:text-xl 
                    py-1 sm:py-0
                    inline-block
                  "
                >
                  {service.title}
                </Link>
              </motion.div>

              {index < services.length - 1 && (
                <>
                  <span className="block sm:hidden w-full h-px my-2" />
                  <span className="hidden sm:block w-0.5 h-6 bg-black" />
                </>
              )}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}