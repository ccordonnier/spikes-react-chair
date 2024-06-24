import React, { useState } from 'react';
import SwiperCore, { Thumbs, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const Slider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <Swiper
        style={{ '--swiper-navigation-color': 'transparent', '--swiper-pagination-color': 'transparent' }}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[Navigation, Thumbs]}
        className="gallery-top"
      >
        <SwiperSlide>
          <img src="./src/assets/chair1.png" alt="inclined view of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair2.png" alt="left vue of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair3.png" alt="front vue of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair4.png" alt="zoomed vue of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair5.png" alt="detailed vue of chair meryl lounge chair with mesures" />
        </SwiperSlide>
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={5}
        freeMode={true}
        watchSlidesVisibility={false}
        watchSlidesProgress={false}
        className="gallery-thumbs"
      >
        <SwiperSlide>
          <img src="./src/assets/chair1.png" alt="inclined view of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair2.png" alt="left vue of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair3.png" alt="front vue of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair4.png" alt="zoomed vue of chair meryl lounge chair" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./src/assets/chair5.png" alt="detailed vue of chair meryl lounge chair with mesures" />
        </SwiperSlide>
        {/* Ajouter d'autres miniatures si nécessaire */}
      </Swiper>
    </div>
  );
};

export default Slider;
