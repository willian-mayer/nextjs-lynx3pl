// app/components/WeServe.tsx
'use client';

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import data from "../data/weserve.json";

type Item = {
  name: string;
};

type WeServeData = {
  title: string;
  left: Item[];
  right: Item[];
};

const WeServe = () => {
  const { title, left, right } = (data as WeServeData[])[0];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  // Variants
  const headingVariant = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  };

  const listLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const listRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section
      ref={ref}
      className={`px-4 md:px-12 ${
        isDesktop
          ? "md:h-screen flex flex-col items-center justify-end pb-30"
          : "flex flex-col items-center justify-center min-h-screen"
      }`}
    >
      {isDesktop ? (
        <>
          {/* Heading */}
          <motion.h2
            variants={headingVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-md font-bold text-center mb-12 inter-bold"
          >
            {title}
          </motion.h2>

          <div className="flex flex-col md:flex-row w-full h-full md:h-[70%] justify-center items-start">
            {/* Left List */}
            <motion.ul
              variants={listLeftVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex-1 grid grid-cols-2 md:grid-cols-1 font-normal text-right pr-4 md:text-lg inter-medium"
            >
              {left.map((item, i) =>
                item.name.trim() === "" ? (
                  <div key={i} className="h-5 md:h-6" />
                ) : (
                  <li key={i} className="text-black">{item.name}</li>
                )
              )}
            </motion.ul>

            {/* Image */}
            <motion.div
              variants={imageVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="flex justify-center items-center"
            >
              <Image
                src="/weserve/image.jpg"
                alt="We serve"
                width={600}
                height={600}
                className="object-cover max-h-72 md:max-h-full px-4"
                priority
              />
            </motion.div>

            {/* Right List */}
            <motion.ul
              variants={listRightVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="flex-1 grid grid-cols-2 md:grid-cols-1 font-normal text-left pl-4 text-sm md:text-lg inter-medium"
            >
              {right.map((item, i) => (
                <li key={i} className="text-black">{item.name}</li>
              ))}
            </motion.ul>
          </div>
        </>
      ) : (
        <>
          {/* Mobile Heading */}
          <motion.h2
            variants={headingVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-md font-bold text-center mb-6 mt-16 inter-bold"
          >
            {title}
          </motion.h2>

          {/* Mobile Image */}
          <motion.div
            variants={imageVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="mb-6"
          >
            <Image
              src="/weserve/image.jpg"
              alt="We serve"
              width={400}
              height={272}
              className="w-auto h-68 object-cover"
              priority
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-7 w-full justify-center">
            {/* Left */}
            <motion.ul
              variants={listLeftVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-right text-xs flex flex-col items-left inter-medium"
            >
              {left.map((item, i) =>
                item.name.trim() === "" ? (
                  <div key={i} className="h-4" />
                ) : (
                  <li key={i} className="text-black">{item.name}</li>
                )
              )}
            </motion.ul>

            {/* Right */}
            <motion.ul
              variants={listRightVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="text-left text-xs flex flex-col items-right inter-medium"
            >
              {right.map((item, i) => (
                <li key={i} className="text-black">{item.name}</li>
              ))}
            </motion.ul>
          </div>
        </>
      )}
    </section>
  );
};

export default WeServe;