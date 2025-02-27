export default function LineUp() {
  return (
    <div id="lineup" className="py-16 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 text-yellow-300 text-8xl opacity-50">
        ★
      </div>
      <div className="container mx-auto px-4 pt-10">
        <h2 className="text-center text-3xl font-display font-bold mb-12 uppercase">
          Kategori Lomba
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Artist 1 */}
          <div className="card bg-base-100 shadow-xl overflow-hidden group">
            <figure>
              <img
                src="https://soundsfest.com/wp-content/uploads/2024/05/img.png"
                alt="Rizky Febian"
                className="w-full h-full object-cover"
              />
            </figure>
            <div
              className="card-body absolute inset-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 text-white"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <h3 className="card-title text-xl font-bold">RIZKY FEBIAN</h3>
              <p>Main Stage</p>
            </div>
          </div>

          {/* Artist 2 */}
          <div className="card bg-base-100 shadow-xl overflow-hidden group">
            <figure>
              <img
                src="https://soundsfest.com/wp-content/uploads/2024/04/Isyana-Sarasvati.png"
                alt="Isyana Sarasvati"
                className="w-full h-full object-cover"
              />
            </figure>
            <div
              className="card-body absolute inset-0 -translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 text-white"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <h3 className="card-title text-xl font-bold">ISYANA SARASVATI</h3>
              <p>Special Performance</p>
            </div>
          </div>

          {/* Artist 3 */}
          <div className="card bg-base-100 shadow-xl overflow-hidden group">
            <figure>
              <img
                src="https://soundsfest.com/wp-content/uploads/2024/05/img-1.png"
                alt="Mahalini"
                className="w-full h-full object-cover"
              />
            </figure>
            <div
              className="card-body absolute inset-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000 text-white"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
              <h3 className="card-title text-xl font-bold">MAHALINI</h3>
              <p>Main Stage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
