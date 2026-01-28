// app/components/Form.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Turnstile } from "@marsidev/react-turnstile";
import formData from "../data/form.json";

type FormData = {
  contactInfo: string[];
  interests: string[];
};

export default function Form() {
  const { contactInfo, interests } = formData as FormData;
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
    interests: [] as string[],
  });

  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
  
    // Prevenir múltiples envíos
    if (isSubmitting) return;
  
    // Validar que el captcha esté completo
    if (!captchaToken) {
      alert("Please complete the security verification");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          message: formValues.message,
          interests: formValues.interests,
          captchaToken: captchaToken,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.success) {
        // Registrar conversión de Google Ads
        if (typeof window !== 'undefined' && 'gtag' in window) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const gtag = (window as any).gtag;
          gtag('event', 'conversion', {
            'send_to': 'AW-17493174136/CONVERSION_ID',
            'value': 1.0,
            'currency': 'USD',
          });
        }
  
        router.push("/thank-you");
      } else {
        // Mostrar error pero igual redirigir
        console.error('Form submission error:', result.error);
        router.push("/thank-you");
      }
    } catch (error) {
      console.error('Network error:', error);
      router.push("/thank-you");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 📱 Mobile Layout
  if (!isDesktop) {
    return (
      <section className="px-4 md:px-6 pt-18 md:pt-0 h-screen md:flex md:items-center md:justify-center">
        <div className="w-full max-w-6xl overflow-y-auto md:overflow-visible md:h-auto h-full">
          <h1 className="text-center font-bold text-xl mb-3 ml-25 inter-bold">
            Contact Us
          </h1>

          <form onSubmit={handleSubmit} className="grid gap-2">
            {/* Full Name */}
            <label className="flex text-md font-medium pb-2 mx-5 inter-medium">
              <span className="whitespace-nowrap mt-1 pr-4 text-md font-bold inter-bold">
                Full Name
              </span>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border px-3 h-6 rounded"
              />
            </label>

            {/* Email */}
            <label className="flex text-md font-medium mx-5 inter-medium">
              <span className="whitespace-nowrap mt-1 pr-[14px] text-md font-bold inter-bold">
                Your Email
              </span>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full border px-3 py-1 h-6 rounded"
              />
            </label>

            {/* Grid de 2 columnas */}
            <div className="grid grid-cols-2 gap-4 ml-5 mt-2">
              {/* Columna izquierda: Interests */}
              <div>
                <h2 className="text-md font-bold mb-2 inter-bold">I&apos;m interested in:</h2>
                <div className="flex flex-col gap-3">
                  {interests.map((interest, idx) => (
                    <label
                      key={idx}
                      className="text-xs font-semibold flex items-center gap-1 inter-medium"
                    >
                      <input
                        type="checkbox"
                        value={interest}
                        checked={formValues.interests.includes(interest)}
                        onChange={handleCheckboxChange}
                        disabled={isSubmitting}
                        className="accent-green-600"
                      />
                      {interest}
                    </label>
                  ))}
                </div>
                <h2 className="text-left font-bold mt-7 inter-bold">Lynx3PL, Inc. </h2>
              </div>

              {/* Columna derecha: Message + Botón + Info + Mapa */}
              <div className="flex flex-col">
                <label className="flex flex-col text-md font-medium pr-6 inter-medium">
                  <span className="whitespace-nowrap font-bold inter-bold">
                    Your Message
                  </span>

                  <textarea
                    name="message"
                    rows={4}
                    value={formValues.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full border-2 h-30 px-5 mt-1 rounded border-[#045804]"
                  />
                </label>

                {/* Cloudflare Turnstile - Mobile */}
                <div className="my-2">
                  <Turnstile
                    siteKey="0x4AAAAAACLRfh9cuYX_f6IW"
                    onSuccess={(token: string) => setCaptchaToken(token)}
                    options={{
                      theme: "light",
                      size: "compact",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !captchaToken}
                  className="bg-[#045804] text-white px-2 py-1 rounded text-xs self-start disabled:opacity-50 disabled:cursor-not-allowed inter-bold"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>

                <div className="my-2">
                  {contactInfo.map((line, i) => (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? "text-sm font-extrabold text-black inter-bold"
                          : "text-xs font-normal text-black inter"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <div className="border-3 border-black rounded mr-6 h-30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.99225188882!2d-84.965537!3d34.755787999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88600b7ac7c171ad%3A0x7adaa70446346069!2sLynx3PL%20Inc!5e0!3m2!1spt-BR!2sbr!4v1749732230049!5m2!1sen!2sus"
                    width="100%"
                    height="auto"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-28"
                  ></iframe>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }

  // 💻 Desktop Layout
  return (
    <section className="px-20 pt-0 h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl grid grid-cols-4 gap-5"
      >
        {/* Columna 1 y 2: Formulario */}
        <div className="col-span-2 space-y-4">
          <label className="flex items-start gap-4 text-md font-medium inter-medium">
            <span className="whitespace-nowrap w-40 mt-1 font-bold inter-bold">
              Full Name
            </span>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full border px-3 h-8 rounded"
            />
          </label>

          <label className="flex items-start gap-4 text-md font-medium inter-medium">
            <span className="whitespace-nowrap w-40 mt-1 font-bold inter-bold">
              Your Email
            </span>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full border px-3 h-8 rounded"
            />
          </label>

          <label className="flex flex-row text-md font-medium inter-medium">
            <span className="whitespace-nowrap font-bold mr-8 inter-bold">
              Your Message
            </span>

            <textarea
              name="message"
              rows={4}
              value={formValues.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full border-2 h-55 p-2 mt-1 rounded border-[#045804]"
            />
          </label>

          {/* Cloudflare Turnstile - Desktop */}
          <div className="ml-[10em]">
            <Turnstile
              siteKey="0x4AAAAAACLRfh9cuYX_f6IW"
              onSuccess={(token: string) => setCaptchaToken(token)}
              options={{
                theme: "light",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !captchaToken}
            className="bg-[#045804] text-white px-4 py-2 rounded text-sm ml-[10em] disabled:opacity-50 disabled:cursor-not-allowed inter-bold"
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </button>

          <h1 className="font-bold text-5xl inter-bold">Contact Us</h1>
        </div>

        {/* Columna 3: Interests */}
        <div>
          <h2 className="text-xl font-bold mb-4 inter-bold">I&apos;m interested in:</h2>
          <div className="flex flex-col gap-[9.6px]">
            {interests.map((interest, idx) => (
              <label
                key={idx}
                className="text-md font-semibold flex items-center gap-2 inter-medium"
              >
                <input
                  type="checkbox"
                  value={interest}
                  checked={formValues.interests.includes(interest)}
                  onChange={handleCheckboxChange}
                  disabled={isSubmitting}
                  className="accent-green-600"
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        {/* Columna 4: Info Empresa + Mapa */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold inter-bold">Lynx3PL, Inc.</h2>

          <div>
            {contactInfo.map((line, i) => (
              <p
                key={i}
                className={
                  i === 1
                    ? "text-md font-normal text-black mb-2 inter"
                    : "text-md font-normal text-black mr-20 inter"
                }
              >
                {line}
              </p>
            ))}
          </div>

          <div className="border-3 border-black rounded overflow-hidden w-62">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.99225188882!2d-84.965537!3d34.755787999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88600b7ac7c171ad%3A0x7adaa70446346069!2sLynx3PL%20Inc!5e0!3m2!1spt-BR!2sbr!4v1749732230049!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </form>
    </section>
  );
}