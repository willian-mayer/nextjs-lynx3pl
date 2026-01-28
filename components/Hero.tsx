// app/components/Hero.tsx
'use client';

import { Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import heroData from "../data/hero.json";

type HeroData = {
  contact: {
    title: string;
  };
};

export default function Hero() {
  const { contact } = heroData as HeroData;

  const [starSize, setStarSize] = useState(20);
  const [starWidth, setStarWidth] = useState("1rem");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setStarSize(20);
        setStarWidth("2rem");
      } else {
        setStarSize(20);
        setStarWidth("1rem");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ref para detectar si está en viewport
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });

  // ✅ Variants corregidos con tipo Variants de framer-motion
  const headingVariant = {
    hidden: { 
      opacity: 0, 
      y: -40 
    },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  const bottomVariant = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
    },
  };

  return (
    <section
      ref={heroRef}
      className="h-screen overflow-hidden flex flex-col justify-between sm:mx-48"
    >
      {/* Contenido central */}
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.h1
          variants={headingVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            text-black font-black text-left
            text-[2.2em] sm:text-[2.3em] md:text-[2.8em] xl:text-[3.5em]
            leading-tight w-full mx-auto mt-20 md:mt-0 inter-bold
          "
        >
          {/* ☝️ Agregué inter-bold y quité el inline style de font-family */}
          <span className="block sm:inline">Reliable </span>
          <span className="block sm:inline">fulfillment, </span>
          <span className="block sm:inline">B2B, FBA, FBM, LTL</span>
          <span className="block">warehouse & more.</span>
        </motion.h1>
      </div>

      {/* Parte inferior */}
      <motion.div
        variants={bottomVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="
          grid grid-cols-2 items-end justify-between gap-4 pb-12 w-full px-3 md:pb-10
        "
      >
        {/* Review a la izquierda */}
        <div className="justify-self-start flex flex-col items-center justify-center text-xs sm:text-sm md:text-lg lg:text-xl rounded-md">
          <div className="flex items-center gap-[1px]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="text-red-500 fill-red-500"
                size={starSize}
                style={{ width: starWidth }}
              />
            ))}
          </div>
          <p className="text-black text-md sm:text-2xl leading-snug text-center whitespace-nowrap font-medium inter">
            Client&apos;s reviews
          </p>
        </div>

        {/* Botón a la derecha */}
        <Link
          href="#form"
          className="
            justify-self-end bg-black text-white px-4 py-1.5 sm:px-5 sm:py-2
            md:px-6 md:py-3 text-md sm:text-sm md:text-lg
            hover:bg-gray-900 font-bold transition flex items-center justify-center rounded-full whitespace-nowrap mb-[10px] inter-bold
          "
        >
          {contact.title}
        </Link>
      </motion.div>
    </section>
  );
}