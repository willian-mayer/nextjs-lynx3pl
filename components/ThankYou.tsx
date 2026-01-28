// app/components/ThankYou.tsx
import Image from "next/image";

export default function ThankYou() {
  return (
    <div className="h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-10 inter-bold">
          Thank you!
        </h1>
        
        <p className="text-lg md:text-2xl text-black mb-8 inter-medium">
          Your message has been received, and a team member will get back to you within 1 business day. 
          In the meantime, feel free to check out our FAQ or follow us on social media.
        </p>
        
        <p className="text-md md:text-2xl text-black mb-8 inter-medium">
          We appreciate your patience and look forward to connecting with you!
        </p>
        
        <Image 
          src="/logo-black.png" 
          alt="Lynx3PL Logo"
          width={256}
          height={100}
          className="mx-auto w-48 md:w-64"
        />
      </div>
    </div>
  );
}
