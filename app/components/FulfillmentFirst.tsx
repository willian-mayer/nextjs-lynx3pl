// app/components/FulfillmentFirst.tsx
'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import data from "../data/fulfillmentFirst.json";

type FulfillmentFirstData = {
  title: string;
};

export default function FulfillmentFirst() {
  const { title } = data as FulfillmentFirstData;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <section
      ref={ref}
      className="w-full sm:px-10 lg:px-20 py-10 min-h-screen flex items-center"
    >
      <div
        className="
          w-full
          flex flex-col md:flex-row items-center justify-center 
          gap-8 lg:mx-24
          text-center md:text-left
        "
      >
        {/* Imagen (primero en escritorio) */}
        <div className="relative flex items-center justify-center w-full md:w-2/3 md:rounded-xl overflow-hidden order-2 md:order-1 md:ml-6 md:mt-20">
          <motion.div
            className="w-full relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Image
              src="/fulfillmentFirst/image.jpg"
              alt={title}
              width={1200}
              height={500}
              className="w-full object-cover md:h-[500px] md:px-2 rounded-xl"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white rounded-xl">
            <p className="text-center text-xs md:text-lg font-bold leading-snug text-black md:px-10 lg:px-16 mb-25 md:mb-50 inter-bold">
              Our box is open,<br /> we welcome business of all sizes to connect with us!
            </p>
          </div>
        </div>

        {/* Texto (primero en móvil, segundo en escritorio) */}
        <div
          className="
            flex flex-col w-full md:w-1/3 order-1 md:order-2 md:justify-end
            h-auto md:h-full
            mt-20
            md:mt-50
            md:mr-5
            md:mb-2
            ml-4
          "
        >
          <motion.h2
            className="text-3xl md:text-6xl font-bold text-black mb-4 md:mb-14 md:mt-0 text-right mr-10 md:mr-0 inter-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>

          {/* Texto condicional según tamaño de pantalla */}
          {isDesktop ? (
            // ===== Versión escritorio =====
            <motion.p
              className="text-12 md:text-[1.1em] text-black md:mx-0 md:px-0 text-right w-72 md:w-full md:ml-0 mr-4 md:mr-0 inter-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Managing fulfillment can be stressful{" "}
              <span className="inline md:block">and time consuming.</span>{" "}
              <span className="inline md:block">We take care of</span>{" "}
              inventory, packing, and shipping,
              <span className="inline md:block"></span> so you can focus on
              growing your business.
            </motion.p>
          ) : (
            // ===== Versión móvil =====
            <motion.p
              className="text-12 md:text-[1.5em] text-black md:mx-0 md:px-0 text-right md:w-72 md:w-full md:ml-0 md:mr-0 mr-10 md:mr-0 inter-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Managing fulfillment can be stressful
              <span className="block md:inline">
                {" "}
                and time consuming. We take care of
              </span>{" "}
              <span className="block md:inline">
                {" "}
                inventory, packing, and shipping,
              </span>{" "}
              <span className="block md:inline">
                {" "}
                so you can focus on growing
              </span>{" "}
              your business.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}