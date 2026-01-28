// app/components/Storage.tsx
'use client';

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import data from "../data/storage.json";

type ImageData = {
  imageUrl: string;
};

type SmartphoneData = {
  imageTop?: string;
  imageBottom?: string;
};

type StorageData = {
  title: string;
  desc: string;
  desktop: ImageData[];
  smartphone: SmartphoneData[];
};

const Storage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const { title, desc, desktop, smartphone } = data as StorageData;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Variants
  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariant = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  });

  const mobileImageTopVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileImageBottomVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileTextVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} className="w-full">
      {isDesktop ? (
        <div className="grid grid-cols-6 grid-rows-2 w-full h-screen px-40 py-30">
          {/* Título y descripción */}
          <motion.div
            className="col-span-2 row-span-2 flex flex-col justify-center px-8 gap-3"
            variants={textVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-xl font-bold leading-6 text-left mr-20 mb-3 inter-bold">{title}</h2>
            <p className="text-md text-black font-medium leading-6 text-left mr-34 mt-2 inter-medium">{desc}</p>
          </motion.div>

          {/* Imágenes fila 1 */}
          <div className="col-span-4 row-span-1 grid grid-cols-3 gap-5 mt-12">
            {desktop.slice(0, 3).map((img, i) => (
              <motion.div
                key={i}
                className="w-full h-full relative"
                variants={imageVariant(i * 0.2)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.2 }}
              >
                <Image
                  src={img.imageUrl}
                  alt={`Storage ${i + 1}`}
                  fill
                  className="object-contain mt-1"
                  sizes="33vw"
                />
              </motion.div>
            ))}
          </div>

          {/* Imágenes fila 2 */}
          <div className="col-span-4 row-span-1 grid grid-cols-3 gap-5 mb-12">
            {desktop.slice(3, 6).map((img, i) => (
              <motion.div
                key={i + 3}
                className="w-full h-full relative"
                variants={imageVariant(i * 0.2)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.2 }}
              >
                <Image
                  src={img.imageUrl}
                  alt={`Storage ${i + 4}`}
                  fill
                  className="object-contain"
                  sizes="33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between min-h-screen">
          {/* Imagen top */}
          <motion.div
            className="w-full max-h-40 relative h-40"
            variants={mobileImageTopVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={smartphone[0].imageTop || ""}
              alt="Storage top"
              fill
              className="object-contain mt-20"
              priority
            />
          </motion.div>

          {/* Texto central */}
          <motion.div
            className="text-center flex-1 flex flex-col justify-start py-2 mt-6"
            variants={mobileTextVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            <h2 className="text-[1em] font-bold mb-2 text-left leading-4 ml-26 inter-bold">
              {title}
            </h2>
            <p className="text-[.5em] text-black font-medium text-left ml-26 inter-medium">
              {desc}
            </p>
          </motion.div>

          {/* Imagen bottom */}
          <motion.div
            className="w-full relative h-auto"
            variants={mobileImageBottomVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Image
              src={smartphone[1].imageBottom || ""}
              alt="Storage bottom"
              width={800}
              height={400}
              className="w-full object-contain pb-5"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Storage;