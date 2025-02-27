import { useEffect, useState } from "react";
import MaskotPng from "@/assets/img/maskot.png";

export default function Hero() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2025-07-27T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-gray-100 to-yellow-100 overflow-hidden pt-16"
      id="home"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-yellow-400 text-4xl">✨</div>
      <div className="absolute bottom-40 right-20 text-yellow-400 text-4xl z-0">
        ✨
      </div>
      <div className="absolute top-1/3 right-10 text-green-400 text-4xl">★</div>
      <div className="absolute bottom-1/4 left-1/4 text-yellow-400 text-5xl z-0">
        ☀️
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-16 pb-24 text-center relative z-10">
        <div className="max-w-3xl mx-auto uppercase">
          <h1 className="text-xl md:text-3xl font-bold font-display mb-4 ">
            Lomba Jelagah Jagat & Kreatifitas <br /> Pramuka Wanakerti <br />{" "}
            2025
          </h1>
          <center>
            <img src={MaskotPng} alt="" style={{ height: "30%" }} />
          </center>
          <h1 className="font-bold text-3xl mb-5">27 - 28 Juli 2025</h1>
          <p className="text-xl md:text-1xl mb-6 uppercase">
            SMK Negeri 1 Losarang
            <br />
            Indramayu
          </p>

          {/* Countdown */}
          <div className="mt-10 relative z-10">
            <p className="text-sm uppercase mb-2 font-bold">TIME REMAINING</p>
            <div className="flex justify-center gap-4">
              <div className="bg-white rounded-lg p-3 w-16">
                <div className="text-2xl font-bold">
                  {formatNumber(timeRemaining.days)}
                </div>
                <div className="text-xs">DAYS</div>
              </div>
              <div className="bg-white rounded-lg p-3 w-16">
                <div className="text-2xl font-bold">
                  {formatNumber(timeRemaining.hours)}
                </div>
                <div className="text-xs">HOURS</div>
              </div>
              <div className="bg-white rounded-lg p-3 w-16">
                <div className="text-2xl font-bold">
                  {formatNumber(timeRemaining.minutes)}
                </div>
                <div className="text-xs">MINS</div>
              </div>
              <div className="bg-white rounded-lg p-3 w-16">
                <div className="text-2xl font-bold">
                  {formatNumber(timeRemaining.seconds)}
                </div>
                <div className="text-xs">SECS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
