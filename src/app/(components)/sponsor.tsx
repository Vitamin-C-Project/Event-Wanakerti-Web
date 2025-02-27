import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

export default function Sponsor() {
  return (
    <div className="bg-yellow-300 w-full px-5 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-display font-bold mb-12">
          BRAND & SPONSORSHIP
        </h2>

        <Swiper
          spaceBetween={80}
          slidesPerView={1}
          grabCursor={true}
          breakpoints={{
            320: {
              spaceBetween: 30,
              slidesPerView: 2,
            },
            480: {
              spaceBetween: 30,
              slidesPerView: 3,
            },
            768: {
              spaceBetween: 30,
              slidesPerView: 4,
            },
            1024: {
              spaceBetween: 30,
              slidesPerView: 6,
            },
          }}
          autoplay
          loop
        >
          {[...Array(20)].map((_, i) => (
            <SwiperSlide key={i}>
              <img
                src={`https://hakim-asrori.github.io/assets/web-acteeve.37a06fae.png`}
                alt=""
                style={{ height: 100 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
