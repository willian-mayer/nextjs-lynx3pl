// app/components/FulfillmentSecond.tsx
'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import data from "../data/fulfillmentSecond.json";

type Benefit = {
  title: string;
  desc: string;
};

type FulfillmentSecondData = {
  title: string;
  desc: string;
  benefits: Benefit[];
};

export default function FulfillmentSecond() {
  const { title, desc, benefits } = (data as FulfillmentSecondData[])[0];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative md:px-6 pt-10 pb-2 h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="w-full max-w-[1100px] flex flex-col md:grid md:grid-cols-2 gap-6 items-center h-full">

        {/* Columna 1: Imagen + Título con orden adaptable */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:mb-27 gap-3">
          
          {/* Imagen (segundo en móvil, primero en escritorio) */}
          <div className="flex justify-center items-center overflow-hidden md:h-[180px] md:w-[400px] h-[100px] order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="w-full h-full relative"
            >
              {/* Imagen para desktop */}
              <Image
                src="/fulfillmentSecond/image-md.jpg"
                alt="Fulfillment Service"
                fill
                className="object-cover hidden md:block"
                sizes="(max-width: 768px) 0vw, 400px"
              />
              
              {/* Imagen para móvil */}
              <Image
                src="/fulfillmentSecond/image.jpg"
                alt="Fulfillment Service"
                fill
                className="object-cover md:hidden"
                sizes="(max-width: 768px) 100vw, 0vw"
                priority
              />
            </motion.div>
          </div>

          {/* Texto (primero en móvil, segundo en escritorio) */}
          <div className="order-1 md:order-2">
            <motion.h2
              className="text-[1em] md:text-[1.6em] mx-20 md:mx-0 font-bold leading-tight mb-2 md:mr-46 mt-10 md:mt-0 text-center md:text-left md:flex-1 inter-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>

            {/* Descripción solo en móvil */}
            <motion.p
              className="text-black text-[0.65em] leading-snug md:hidden ml-45 mr-10 inter"
              initial={{ opacity: 0, y: -10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {desc}
            </motion.p>
          </div>
        </div>

        {/* Columna 2: Benefits */}
        <div className="flex flex-col justify-center px-4">
          <div className="space-y-2 md:space-y-3">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 * i }}
              >
                <h4 className="text-[0.6em] md:text-[0.9em] ml-41 md:mr-0 md:ml-0 inter-bold">
                  ● {b.title}
                  <span className="text-black font-normal inter-medium">
                    : {b.desc.trim()}
                  </span>
                </h4>
              </motion.div>
            ))}
            {/* El párrafo para pantallas md+ */}
            <motion.p
              className="hidden md:block absolute bottom-8 text-[0.9em] font-bold text-left leading-snug mr-46 mb-20 inter-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {desc}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Ajuste específico para Surface Duo / pantallas intermedias */}
      <style jsx>{`
        @media (min-width: 540px) and (max-width: 720px) {
          .surface-duo-img {
            max-width: 50% !important;
          }
        }
      `}</style>
    </section>
  );
}