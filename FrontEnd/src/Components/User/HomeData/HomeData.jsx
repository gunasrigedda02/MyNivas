import React, { useEffect } from 'react';
import HomeAbout from '../HomeAbout/HomeAbout';
import Amenities from '../Amenities/Amenities';
import FAQ from '../FAQ/FAQ';
import Write from '../Write/Write';
import styles from './HomeData.module.css';
import SliderComponent from '../Slider/Slider';

const HouseIcon = () => (
  <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gradHouse" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a237e" />
        <stop offset="100%" stopColor="#00c6ff" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00c6ff" floodOpacity="0.7" />
      </filter>
    </defs>
    <path
      filter="url(#shadow)"
      d="M32 12L12 32H20V52H44V32H52L32 12Z"
      fill="url(#gradHouse)"
      stroke="#00c6ff"
      strokeWidth="2"
    />
    <rect x="26" y="36" width="12" height="16" fill="#00c6ff88" rx="2" ry="2" />
  </svg>
);

function HomeData() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          } else {
            entry.target.classList.remove(styles.inView);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(`.${styles.animateOnScroll}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="homedata-page" className={styles.homedataPage}>
        <div id="image-mybg" className={styles.imageMybg}>
          <img src="/mybg.jpg" id="mybg" alt="Background" className={styles.mybg} />
          <div className={styles.navyBlurOverlay}>
            <img src="/window-icon1.png" alt="House Icon" className={styles.animatedHouse} />
            <img src="/key-icon.png" alt="Key Icon" className={styles.animatedKey} />
            <img src="/bed-icon.png" alt="Bed Icon" className={styles.animatedBed} />
            <img src="/house-icon.png" alt="Window Icon" className={styles.animatedWindow} />
            <div className={styles.pulseDot}></div>
            <div className={styles.zigzagLine}>
              <svg width="90" height="20" viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20 L10 0 L20 20 L30 0 L40 20 L50 0 L60 20 L70 0 L80 20 L90 0" />
              </svg>
            </div>
          </div>
          <div className={`${styles.overlayContent} ${styles.animateOnScroll}`} data-animate="fade-in-container">
            <h1 id="hd-des" className={styles.hdDes}>
              Find Your Perfect Hostel
            </h1>
            <h2 id="hd-con" className={styles.hdCon}>
              Discover Affordable And Comfortable Hostels Near Your Campus
            </h2>
          </div>
        </div>
      </div>
      <div className={styles.homedataSlider}>
        <div className={styles.hdSliderContent}>
          <span>Hostels Near You</span>
          <span id="sec-sp" className={styles.secSp}>
            Explore the best hostels in your area
          </span>
        </div>
        <SliderComponent />
        <HomeAbout />
        <Amenities />
        <FAQ />
        <Write />
      </div>
    </>
  );
}

export default HomeData;