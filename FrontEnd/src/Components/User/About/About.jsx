import { useEffect, useRef } from 'react';
import styles from './About.module.css';

function AboutUs() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          } else {
            entry.target.classList.remove(styles.inView);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <div className={styles.aboutUsContainer}>
        <h1 className={styles.heading}>About Us</h1>


        <div
          className={styles.section}
          ref={el => (sectionRefs.current[0] = el)}
        >
          <div className={styles.imageContainer}>
            <img src="/about/about1.jpg" alt="Our Mission" />
          </div>
          <div className={styles.content}>
            <h2>Who We Are?</h2>
            <p>
              MYNIVAS is a dedicated platform committed to transforming the way you find hostels and PG accommodations. We understand the challenges students and professionals face while searching for safe, affordable, and convenient living spaces. That’s why we bring together verified listings, real user reviews, and comprehensive details about essential amenities to help you make informed decisions. Our mission is to simplify your search process by offering a reliable, user-friendly platform that connects you to the best accommodation options near you. Whether you’re looking for a quiet study space, daily cleaning, or 24/7 security, MYNIVAS ensures you find a place that feels like home.
            </p>
          </div>
        </div>


        <div
          className={`${styles.section} ${styles.reverse}`}
          ref={el => (sectionRefs.current[1] = el)}>
          <div className={styles.imageContainer}>
            <img src="/about/about2.png" alt="Our Mission" />
          </div>
          <div className={styles.content}>
            <h2>What we do?</h2>
            <p>
              At MYNIVAS, we make hostel and PG hunting effortless by providing a comprehensive platform where you can browse verified accommodations tailored to your needs. We aggregate detailed listings that include essential amenities like WiFi, daily cleaning, and security, so you know exactly what to expect. Our platform offers powerful search and filter options, enabling you to find the perfect stay quickly and easily. Beyond listings, we connect you with trusted owners and offer transparent user reviews to help you choose confidently. From initial search to booking confirmation, MYNIVAS is your reliable partner in finding a comfortable, affordable, and secure place to live.
            </p>
          </div>
        </div>


        <div
          className={styles.section}
          ref={el => (sectionRefs.current[2] = el)}
        >
          <div className={styles.imageContainer}>
            <img src="/about/about3.png" alt="Our Mission" />
          </div>
          <div className={styles.content}>
            <h2>How It Works</h2>
            <p>
              Using MYNIVAS is simple and efficient. Start by entering your location and preferences such as budget, type of accommodation, and desired amenities. Our platform then displays verified listings with photos, detailed descriptions, and user reviews to help you make an informed choice. You can compare options side-by-side and reach out to landlords or book directly through the site. Our secure booking process ensures your information is protected. Plus, MYNIVAS continuously updates listings to provide the latest availability and offers, making your hostel or PG search smooth, reliable, and stress-free.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
