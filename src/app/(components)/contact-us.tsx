import MaskotPng from "@/assets/img/maskot.png";
import LogoPng from "@/assets/img/logo-wanakerti.png";

export default function ContactUs() {
  return (
    <div id="contact" className="py-16 bg-green-400 relative overflow-hidden">
      <div className="absolute top-10 right-10 text-yellow-200 text-4xl">
        ✨
      </div>
      <div className="absolute bottom-10 left-10 text-yellow-200 text-4xl">
        ✨
      </div>

      <div className="container mx-auto px-4 min-h-[700px] sm:min-h-1.5 pt-10">
        <h2 className="text-center text-3xl font-display font-bold mb-12 uppercase">
          Kontak Kami
        </h2>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="bg-white p-2 rounded-2xl input-bordered w-full text-sm input"
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-white px-2 py-3 rounded-2xl input-bordered w-full text-sm input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-white px-2 py-3 rounded-2xl input-bordered w-full text-sm input"
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Subject"
                  className="bg-white px-2 py-3 rounded-2xl input-bordered w-full text-sm input"
                />
              </div>
            </div>

            <div className="form-control">
              <textarea
                placeholder="Your Question"
                className="textarea h-32 w-full bg-white p-2 rounded-2xl"
              ></textarea>
            </div>

            <div className="form-control">
              <label className="cursor-pointer flex items-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm mt-1" />
                <span className="text-sm">
                  By submitting this form you agree to the Terms and Conditions
                </span>
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-warning rounded-full px-8"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-2 right-20 max-w-xs">
        <div className="flex">
          <img src={MaskotPng} alt="" style={{ height: 150 }} />
          <img src={LogoPng} alt="" style={{ height: 150 }} />
        </div>
      </div>
    </div>
  );
}
