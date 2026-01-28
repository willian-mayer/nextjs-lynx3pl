// app/components/Subscription.tsx
'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Subscription() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const formData = new FormData();
    formData.append("FNAME", name);
    formData.append("EMAIL", email);

    try {
      await fetch(
        "https://lynx3pl.us10.list-manage.com/subscribe/post?u=d0929acf03114ebd5b36aeaf6&id=25b211111e&f_id=003298e3f0",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );

      console.log("Subscriber:", { name, email });
      setSubmitted(true);
      setName("");
      setEmail("");
      setError(null);
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Left Image */}
      <div className="md:w-1/2 w-full pt-20 md:pt-0 md:p-24 bg-gray-50 lg:pl-50">
        <div className="relative w-full h-full p-5">
          <Image
            src="/subscribe/photo.jpg"
            alt="Newsletter illustration"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-50 p-8 lg:pr-50">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {!submitted ? (
            <>
              <h1 className="text-md sm:text-4xl font-bold text-gray-900 mb-4 inter-bold">
                Join Our Newsletter!
              </h1>
              <p className="text-gray-600 mb-6 inter-medium">
                Stay updated with our latest news on{" "}
                <span className="font-semibold">warehousing</span>,{" "}
                <span className="font-semibold">transloading</span>, and{" "}
                <span className="font-semibold">fulfillment</span> services.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#045804] inter"
                />

                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#045804] inter"
                />

                <button
                  type="submit"
                  className="bg-[#045804] text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition inter-bold"
                >
                  Subscribe
                </button>

                {error && (
                  <p className="text-red-600 text-sm text-center mt-2 inter">
                    {error}
                  </p>
                )}
              </form>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <h2 className="text-2xl font-bold text-green-600 inter-bold">
                Thank you for joining! 🎉
              </h2>
              <p className="text-gray-700 text-center inter-medium">
                You&apos;ll now receive the latest updates from us.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}