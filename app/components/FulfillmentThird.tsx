// app/components/FulfillmentThird.tsx
'use client';

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import data from "../data/fulfillmentThird.json";

type Step = {
  title: string;
  desc: string;
};

type FulfillmentThirdData = {
  title: string;
  step: Step[];
  imageUrl: string;
};

export default function FulfillmentThird() {
  const { title, step, imageUrl } = data as FulfillmentThirdData;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full sm:px-10 lg:px-20 py-2 min-h-screen flex items-center"
    >
      <div
        className="
          w-full
          flex flex-col items-center justify-center 
          md:grid md:grid-cols-2 md:gap-12 md:items-center
          lg:mx-24
          md:mt-20
        "
      >
        {/* Columna izquierda: Título y Steps */}
        <div className="flex flex-col items-center md:items-end text-center mt-15 md:mt-0 md:text-right md:space-y-20">
          {/* Title */}
          <motion.h2
            className="text-[1.8em] md:text-4xl font-semibold text-black md:mt-20 md:mt-0 md:mr-20 inter-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>

          {/* Steps */}
          <div className="flex flex-col gap-1 md:gap-2 px-26 md:px-0 text-left w-full max-w-2xl mt-6 ml-4 md:mt-8 md:pl-30">
            {step.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 * (i + 1) }}
              >
                <h3 className="text-sm md:text-[1.1em] font-bold text-black inter-bold">
                  {s.title}{" "}
                  <span className="text-gray-900 text-sm font-normal md:text-[1em] inter-medium">
                    {" "}
                    {s.desc}
                  </span>
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Columna derecha: Imagen */}
        <div className="flex items-center justify-center mt-8 md:mt-0">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: step.length * 0.2 }}
          >
            <Image
              src={imageUrl}
              alt={title}
              width={800}
              height={800}
              className="
                w-full 
                md:w-full
                md:h-full
                lg:w-full
                object-cover 
                object-top
                md:rounded-xl
              "
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}