import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer({ contents }: { contents: any }) {
  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div
            className="text-3xl font-display font-bold mb-4"
            dangerouslySetInnerHTML={{
              __html: contents.theme ? contents.theme.short_title : "LJJKPW",
            }}
          />
          <p
            className="max-w-2xl mx-auto text-sm text-gray-600 mb-6"
            dangerouslySetInnerHTML={{
              __html: contents.theme
                ? contents.theme.full_title
                : "Lomba Jelagah Jagat & Kreatifitas <br /> Pramuka Wanakerti <br /> 2025",
            }}
          />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <a
            href="https://www.facebook.com/wanakerti"
            target="_blank"
            className="btn btn-circle btn-sm bg-blue-600 hover:bg-blue-700 border-none"
          >
            <Facebook size={16} className="text-white" />
          </a>
          <a
            href="https://www.instagram.com/pramuka_wanakerti/"
            target="_blank"
            className="btn btn-circle btn-sm bg-pink-600 hover:bg-pink-700 border-none"
          >
            <Instagram size={16} className="text-white" />
          </a>
        </div>

        <div className="text-center text-sm text-gray-600">
          Copyright © {new Date().getFullYear()}{" "}
          {contents.theme ? contents.theme.short_title : "LJJKPW"}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
