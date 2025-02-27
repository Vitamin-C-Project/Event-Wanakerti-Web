import { Play } from "lucide-react";

export default function Video() {
  return (
    <div
      id="festival"
      className="pb-16 bg-gradient-to-b from-white to-yellow-100 relative overflow-hidden pt-28"
    >
      <div className="absolute bottom-10 left-10 text-yellow-400 text-5xl">
        ☀️
      </div>
      <div className="absolute top-1/4 right-1/4 text-green-400 text-4xl">
        ★
      </div>

      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-display font-bold mb-12 uppercase">
          Rekap pada LJJKPW 5
        </h2>

        <div className="max-w-4xl mx-auto relative rounded-xl overflow-hidden border-4 border-yellow-400">
          <img
            src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Festival crowd"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              className="btn btn-circle btn-lg bg-white bg-opacity-70 hover:bg-opacity-90"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <Play size={32} className="text-yellow-600" />
            </button>
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-full">
          <iframe
            width="100%"
            height="90%"
            src="https://www.youtube.com/embed/qxcxb_lJDfA?si=xchlTs3mJXY9Pe5O"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Tutup</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
