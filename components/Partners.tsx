// app/components/Partners.tsx
'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import data from "../data/partners.json";

type PartnersData = {
  title: string;
};

const Partners = () => {
  const { title } = data as PartnersData;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeDownVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="px-4 md:px-10 py-10 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col items-center gap-6 mt-20 md:mt-40">
        {isDesktop ? (
          <div className="w-full max-w-5xl flex flex-row items-center gap-10">
            {/* Texto del título */}
            <motion.h2
              className="text-[2em] font-bold text-[#045804] text-right ml-32 mt-56 flex-1 inter-bold"
              variants={fadeUpVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {title}
            </motion.h2>

            {/* Imagen principal */}
            <motion.div
              variants={fadeDownVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="/partners/main-logo-new.png"
                alt="Main Partner Logo"
                width={320}
                height={320}
                className="w-80 h-80 object-contain"
                priority
              />
            </motion.div>
          </div>
        ) : (
          <div className="w-full max-w-5xl flex flex-col-reverse items-center gap-10">
            <motion.h2
              className="text-xl font-bold text-[#045804] text-right ml-35 mt-4 flex-1 inter-bold"
              variants={fadeUpVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {title}
            </motion.h2>

            <motion.div
              variants={fadeDownVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="/partners/main-logo-new.png"
                alt="Main Partner Logo"
                width={220}
                height={220}
                className="w-55 h-55 object-contain"
                priority
              />
            </motion.div>
          </div>
        )}

        {/* Partner Logos */}
        {/* Mobile */}
        <motion.div
          className="w-full flex flex-wrap justify-end items-end gap-3 md:hidden p-5 bg-white rounded-xl"
          variants={fadeUpVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/partners/new-logos-small.png"
            alt="Partners Logos"
            width={1200}
            height={600}
            className="w-full h-auto object-contain max-w-6xl"
          />
        </motion.div>

        {/* Desktop */}
        <motion.div
          className="hidden md:flex w-full justify-center mt-10 md:mt-5 md:p-5 bg-white rounded-xl"
          variants={fadeUpVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/partners/new-logos-md.png"
            alt="Partners Logos"
            width={1800}
            height={800}
            className="w-full h-auto object-contain max-w-6xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;