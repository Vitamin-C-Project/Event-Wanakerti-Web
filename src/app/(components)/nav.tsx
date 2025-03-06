import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkReactScroll } from "react-scroll";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold font-display uppercase">
          Wanakerti
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <LinkReactScroll
            spy={true}
            to="home"
            smooth={true}
            activeClass="activeClass"
            className="hover:text-yellow-600 cursor-pointer"
          >
            Beranda
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="lineup"
            smooth={true}
            className="hover:text-yellow-600 cursor-pointer"
          >
            Kategori Lomba
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="festival"
            smooth={true}
            className="hover:text-yellow-600 cursor-pointer"
          >
            Festival
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="tickets"
            smooth={true}
            className="hover:text-yellow-600 cursor-pointer"
          >
            Biaya Pendaftaran
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="contact"
            smooth={true}
            className="hover:text-yellow-600 cursor-pointer"
          >
            Hubungi Kami
          </LinkReactScroll>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/auth/login"
            className="btn btn-warning rounded-full px-6 py-1.5 hidden md:block"
          >
            Masuk
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden btn btn-ghost btn-circle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "min-h-80 bg-white shadow-md" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
          <LinkReactScroll
            spy={true}
            to="home"
            smooth={true}
            activeClass="activeClass"
            className="py-2 border-b border-gray-100 hover:text-yellow-600"
          >
            Beranda
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="lineup"
            smooth={true}
            className="py-2 border-b border-gray-100 hover:text-yellow-600"
          >
            Kategori Lomba
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="tickets"
            smooth={true}
            className="py-2 border-b border-gray-100 hover:text-yellow-600"
          >
            Biaya Pendaftaran
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="festival"
            smooth={true}
            className="py-2 border-b border-gray-100 hover:text-yellow-600"
          >
            Festival
          </LinkReactScroll>
          <LinkReactScroll
            spy={true}
            to="contact"
            smooth={true}
            className="py-2 border-b border-gray-100 hover:text-yellow-600"
          >
            Hubungi Kami
          </LinkReactScroll>
          <Link
            to="/auth/login"
            className="btn btn-warning rounded-full px-6 self-start"
          >
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}
