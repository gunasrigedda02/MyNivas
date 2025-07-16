// src/components/user/Home/Slider.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Slider.module.css';

export default function SliderComponent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 2000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const images = [
    '/hostel1.png',
    '/hostel1.png',
    '/hostel1.png',
    '/hostel1.png',
    '/hostel1.png',
    '/hostel1.png',
  ];

  return (
    <div className={styles.sliderWrapper}>
      <Slider {...settings}>
        {images.map((src, index) => {
          const isActive = currentSlide % images.length === index;
          return (
            <div
              key={index}
              className={`${styles.slideCard} ${isActive ? styles.active : ''}`}
            >
              <img
                src={src}
                alt={`Hostel ${index + 1}`}
                className={styles.slideImage}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'inherit',
                }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}