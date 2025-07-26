
import { useState } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: "Accueil", to: "hero" },
    { label: "Mission", to: "mission" },
    { label: "Recrutement", to: "recrutement" },
  ];

  return (
    <header className="fixed w-full top-0 z-40 bg-black bg-opacity-80 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">DGSE</h1>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              className="text-white hover:text-blue-500 cursor-pointer transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-90 py-4 px-6 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              onClick={() => setIsOpen(false)}
              className="block text-white hover:text-blue-500 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
