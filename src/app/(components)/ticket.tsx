import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Ticket({ contents }: { contents: any }) {
  return (
    <div id="tickets" className="py-16 bg-yellow-300 relative overflow-hidden">
      <div className="absolute top-10 left-10 text-white text-4xl opacity-30">
        ★
      </div>
      <div className="absolute bottom-10 right-10 text-white text-4xl opacity-30">
        ✨
      </div>

      <div className="container mx-auto px-4 ">
        <h2 className="text-center text-3xl font-display font-bold mb-6 uppercase">
          Registrasi Sekarang
        </h2>
        <p className="text-center max-w-2xl mx-auto mb-10">
          Bergabunglah dengan ribuan pecinta Pramuka di ajang lomba Pramuka
          terbesar di Jawa Barat! Daftar sekarang untuk mengamankan tempatmu dan
          rasakan pengalaman kompetisi yang tak terlupakan!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Standard Registration */}
          {contents?.categories?.map((category: any) => (
            <div className="card bg-green-100 shadow-xl overflow-hidden relative">
              <div className="card-body items-center text-center pt-12">
                <h3 className="card-title text-xl mb-2">{category.name}</h3>
                <p className="text-3xl font-bold mb-4">
                  {formatCurrency(category.price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/auth/register"
            className="btn btn-warning btn-lg rounded-full px-10"
          >
            Registrasi
          </Link>
        </div>
      </div>
    </div>
  );
}
