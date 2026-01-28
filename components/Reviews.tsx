// app/components/Reviews.tsx
'use client';

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import data from "../data/reviews.json";

type Review = {
  stars: number;
  review: string;
  author: string;
  country: string;
  year: number;
};

type MainReview = {
  author: string;
  country: string;
  year: number;
};

type ReviewsData = {
  main: MainReview[];
  reviews: Review[];
};

export default function Reviews() {
  const { main, reviews } = data as unknown as ReviewsData;
  const mainReview = main[0];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const renderStars = (count: number) =>
    Array.from({ length: count }).map((_, i) => (
      <Star
        key={i}
        className="w-2 h-2 text-red-600 fill-red-600 inline-block mr-[1px] mt-1 md:w-3 md:h-3"
      />
    ));

  return (
    <section
      ref={ref}
      className="
        px-8 md:px-2 
        py-10 
        min-h-screen 
        flex flex-col 
        gap-6 
        justify-center
        md:justify-center
        md:items-center
        md:h-full
        pt-17
      "
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-stretch gap-3">
        {/* Left column - Main Review + Image */}
        <motion.div
          className="flex flex-col items-center md:items-start md:w-3/5"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Imagen móvil */}
          <Image
            src="/review/quote-new.png"
            alt="Quote Mobile"
            width={300}
            height={144}
            className="block md:hidden w-auto object-contain h-36 mb-1 mr-25"
            priority
          />
          {/* Imagen desktop */}
          <Image
            src="/review/quote-md.png"
            alt="Quote Desktop"
            width={800}
            height={400}
            className="hidden md:block w-full object-contain"
            priority
          />
          {/* Autor */}
          <p className="text-[0.65em] text-red-700 font-semibold text-center md:text-right ml-32 mb-4 md:ml-25 md:text-xl inter-bold">
            — {mainReview.author}, {mainReview.country} ({mainReview.year})
          </p>
        </motion.div>

        {/* Right column - Other Reviews */}
        <div className="md:w-2/5 flex flex-col justify-start gap-4 ml-33 md:ml-0 md:mt-50">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-start"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <div className="flex items-start mr-3 md:mr-0 md:ml-7">
                <div className="flex mr-2 mb-1">{renderStars(r.stars)}</div>
                <p className="text-black text-[0.55em] md:text-[0.85em] font-semibold mb-4 inter-bold">
                  &quot;{r.review}&quot;
                </p>
              </div>
              <p className="text-[0.55em] lg:text-[0.8em] text-red-700 font-semibold mr-8 pl-14 md:ml-15 md:mr-30 inter-bold">
                — {r.author}, {r.country} ({r.year})
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}