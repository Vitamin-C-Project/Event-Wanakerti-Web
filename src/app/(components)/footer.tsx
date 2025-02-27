import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="text-3xl font-display font-bold mb-4">LJJKPW 6</div>
          <p className="max-w-2xl mx-auto text-sm text-gray-600 mb-6">
            Lomba Jelagah Jagat dan Kreatifitas Pramuka Wanakerti
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <a
            href="#"
            className="btn btn-circle btn-sm bg-blue-600 hover:bg-blue-700 border-none"
          >
            <Facebook size={16} className="text-white" />
          </a>
          <a
            href="#"
            className="btn btn-circle btn-sm bg-blue-400 hover:bg-blue-500 border-none"
          >
            <Twitter size={16} className="text-white" />
          </a>
          <a
            href="#"
            className="btn btn-circle btn-sm bg-pink-600 hover:bg-pink-700 border-none"
          >
            <Instagram size={16} className="text-white" />
          </a>
        </div>

        <div className="text-center text-sm text-gray-600">
          Copyright © {new Date().getFullYear()} LJJKPW. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
