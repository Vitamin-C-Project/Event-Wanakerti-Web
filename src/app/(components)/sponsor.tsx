import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

export default function Sponsor({ contents }: { contents: any }) {
  return (
    contents?.brands?.length > 0 && (
      <div className="bg-yellow-300 w-full px-5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-comic-sans-ms font-bold mb-12">
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
            {contents?.brands?.map((brand: any) => (
              <SwiperSlide key={brand.image}>
                <img src={brand.image} alt="" style={{ height: 100 }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    )
  );
}
