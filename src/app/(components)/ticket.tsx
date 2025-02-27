import { Link } from "react-router-dom";

export default function Ticket() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Standard Registration */}
          <div className="card bg-green-100 shadow-xl overflow-hidden relative">
            <div className="absolute -left-6 top-1/2 -rotate-90 transform origin-center bg-green-200 px-4 py-1 font-bold text-sm">
              STANDARD
            </div>
            <div className="card-body items-center text-center pt-12">
              <h3 className="card-title text-xl mb-2">Standard Access</h3>
              <p className="text-3xl font-bold mb-4">IDR 150K</p>
              <ul className="mb-4 text-left">
                <li>• General admission</li>
                <li>• Access to main stage</li>
                <li>• Food court access</li>
              </ul>
            </div>
          </div>

          {/* VIP Registration */}
          <div className="card bg-green-100 shadow-xl overflow-hidden relative">
            <div className="absolute -right-6 top-1/2 rotate-90 transform origin-center bg-green-200 px-4 py-1 font-bold text-sm">
              PREMIUM
            </div>
            <div className="card-body items-center text-center pt-12">
              <h3 className="card-title text-xl mb-2">VIP Experience</h3>
              <p className="text-3xl font-bold mb-4">IDR 300K</p>
              <ul className="mb-4 text-left">
                <li>• Priority entrance</li>
                <li>• VIP viewing area</li>
                <li>• Exclusive merchandise</li>
                <li>• Meet & greet opportunity</li>
              </ul>
            </div>
          </div>
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
