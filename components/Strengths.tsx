// app/components/Strengths.tsx
'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import strengthsData from "../data/strengths.json";

type StrengthItem = {
  line: string;
};

type Strength = {
  title: string;
  description: StrengthItem[];
};

export default function Strengths() {
  const { title, description } = (strengthsData as Strength[])[0];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="flex flex-col-reverse lg:flex-row w-full h-screen justify-center lg:justify-normal px-5"
    >
      {/* Video abajo en móvil, izquierda en desktop */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center px-6 md:mb-0 md:p-12 md:pt-56"
      >
        <video
          src="/watchus/video-2.mp4"
          className="max-w-md md:max-w-lg w-full h-auto object-contain mt-2"
          controls
          playsInline
          preload="metadata"
        >
          <source src="/watchus/video-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Texto arriba en móvil, derecha en desktop */}
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              delay: 0.8,
              staggerChildren: 0.2,
            },
          },
        }}
        className="w-full lg:w-1/2 flex justify-center lg:justify-start items-center p-6 md:p-12"
      >
        <div className="max-w-xl w-full">
          <motion.h2
            className="flex items-baseline justify-end lg:justify-start text-2xl md:text-[3em] font-bold text-gray-900 mb-6 uppercase inter-bold pt-10 lg:mb-12"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span>{title}</span>
            <span className="text-green-900 font-bold text-[40px] md:text-[60px] pt-5">
              .
            </span>
          </motion.h2>

          <ul className="space-y-3 text-xs text-black leading-relaxed text-left lg:pr-10 md:border-l-1 md:py-2 md:pl-5">
            {description.map((item, index) => (
              <motion.li
                key={index}
                className="relative md:py-1 inter-bold md:inter-bold md:text-[1.2em]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {item.line}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}