"use client";

import Link from "next/link";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          SandsTech
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/operators" className="hover:text-gray-200">
            Operadores
          </Link>
          <Link href="/clients" className="hover:text-gray-200">
            Clientes
          </Link>
        </nav>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <RxCross1 size={28} /> : <CiMenuBurger size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-4 bg-blue-500 p-4 rounded-md shadow-lg">
          <Link href="/operators" className="block hover:text-gray-200">
            Operadores
          </Link>
          <Link href="/clients" className="block hover:text-gray-200">
            Clientes
          </Link>
        </div>
      )}
    </header>
  );
};
