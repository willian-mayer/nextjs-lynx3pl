// app/components/Transboarding.tsx
'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import transboardingData from "../data/transboarding.json";

type TransboardingData = {
  title: string;
  shipImageUrl: string;
};

const Transboarding = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const { title, shipImageUrl } = transboardingData as TransboardingData;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Variants
  const headingVariant = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  const imageTopVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageMainVariant = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1 },
  };

  const imageBottomVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const titleRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      ref={ref}
      className="w-full h-screen flex items-center justify-center lg:px-12 pt-18"
    >
      {isDesktop ? (
        <div className="flex w-full h-full items-center justify-center gap-8 mx-38">
          {/* Columna izquierda con imágenes */}
          <div className="flex flex-col items-center w-2/3">
            <motion.div
              variants={imageTopVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <Image
                src="/transboarding/top.png"
                alt="Top decoration"
                width={1200}
                height={200}
                className="w-full h-auto object-contain p-2 bg-white rounded-xl"
              />
            </motion.div>

            <motion.div
              variants={imageMainVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="w-full my-2 relative h-80"
            >
              <Image
                src={shipImageUrl}
                alt={title}
                fill
                className="object-cover rounded-lg p-2"
                priority
              />
            </motion.div>

            <motion.div
              variants={imageBottomVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="w-full"
            >
              <Image
                src="/transboarding/bottom.png"
                alt="Bottom decoration"
                width={1200}
                height={200}
                className="w-full h-auto object-contain p-2 bg-white rounded-xl"
              />
            </motion.div>
          </div>

          {/* Título - derecha */}
          <motion.div
            className="flex items-center justify-center w-1/3"
            variants={titleRightVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold ml-30 text-[#045804] inter-bold">{title}</h1>
          </motion.div>
        </div>
      ) : (
        // Mobile Layout
        <div className="flex flex-col w-full h-full">
          <motion.h1
            className="text-right text-xl font-bold my-10 ml-50 mr-10 text-[#045804] inter-bold"
            variants={headingVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {title}
          </motion.h1>

          <motion.div
            variants={imageMainVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full h-[120px] relative"
          >
            <Image
              src={shipImageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            variants={imageBottomVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-7 px-10"
          >
            <Image
              src="/transboarding/small-new.png"
              alt="Extra visual"
              width={800}
              height={400}
              className="w-full h-auto object-contain py-2 bg-white rounded-xl"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Transboarding;