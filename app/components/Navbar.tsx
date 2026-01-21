// app/components/Navbar.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Route } from "../types/routes";
import ContactButton from "./ContactButton";
import { Menu, X, ChevronDown } from "lucide-react";

type NavbarProps = {
  title: string;
  routes: Route[];
};

export default function Navbar({ title, routes }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <nav className="bg-white sticky top-0 left-0 right-0 z-50 w-full px-2 md:px-16 pt-5 pb-2">
      <div className="mx-auto flex items-center justify-between px-2 md:px-32">
        {/* Logo */}
        <Link href="/" className="cursor-pointer flex-shrink-0">
          <Image
            src="/logo-black.png"
            alt={title}
            width={40}
            height={40}
            className="h-7 sm:h-10 w-auto ml-2"
            priority
          />
        </Link>

        {/* Links + Contact en desktop */}
        <div className="hidden sm:flex flex-row items-center gap-x-5 text-base md:text-md">
          {routes.map((route) =>
            route.sublink ? (
              // Tiene sublinks
              <div key={route.name} className="relative group">
                <button
                  onClick={() => toggleSubmenu(route.name)}
                  className="font-semibold text-black hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {route.name} <ChevronDown size={16} />
                </button>
                {/* Submenu en desktop */}
                {openSubmenu === route.name && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md p-2 flex flex-col min-w-[180px]">
                    {route.sublink.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className="px-3 py-2 text-sm text-black font-semibold hover:text-blue-600 whitespace-nowrap"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : route.path ? (
              // No tiene sublinks y tiene path
              <Link
                key={route.path}
                href={route.path}
                className="font-semibold text-black hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                {route.name}
              </Link>
            ) : null // Si no tiene ni sublink ni path, no renderizar nada
          )}
          <div className="flex-shrink-0">
            <ContactButton />
          </div>
        </div>

        {/* Botón menú hamburguesa en móvil */}
        <button className="sm:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-3 px-4 pb-4 bg-white shadow-md text-right text-lg">
          {routes.map((route) =>
            route.sublink ? (
              // Tiene sublinks
              <div key={route.name} className="flex flex-col">
                <button
                  onClick={() => toggleSubmenu(route.name)}
                  className="font-semibold text-black hover:text-blue-600 transition-colors flex justify-end gap-2 items-center"
                >
                  {route.name}
                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      openSubmenu === route.name ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {/* Submenu en móvil */}
                {openSubmenu === route.name && (
                  <div className="flex flex-col pl-4 mt-2 gap-2">
                    {route.sublink.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className="text-sm font-medium text-black hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : route.path ? (
              // No tiene sublinks y tiene path
              <Link
                key={route.path}
                href={route.path}
                className="font-semibold text-black hover:text-blue-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {route.name}
              </Link>
            ) : null // Si no tiene ni sublink ni path, no renderizar nada
          )}
          {/* ContactButton alineado a la derecha */}
          <div className="self-end">
            <ContactButton />
          </div>
        </div>
      )}
    </nav>
  );
}