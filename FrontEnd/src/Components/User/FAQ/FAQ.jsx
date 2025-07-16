// src/components/user/Home/FAQ.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './FAQ.module.css';

const faqData = [
  {
    question: "How do I find hostels near my college?",
    answer:
      "Enter your college or campus name in the search bar, or allow location access. The app will show you available hostels and PGs closest to your university.",
  },
  {
    question: "Can I see details like rent, facilities, and photos?",
    answer:
      "While it doesn't currently support direct booking or reservations, we provide detailed contact information, locations, and amenities so you can easily reach out to the hostel owners or managers to inquire and book directly.",
  },
  {
    question: "Is there a way to check reviews or ratings?",
    answer:
      "Yes, previous students can leave reviews and ratings based on their experience to guide you in making a better choice.",
  },
  {
    question: "Are there options for different budgets?",
    answer:
      "Yes, you can filter hostels based on rent range, facilities, and distance from campus to suit your budget.",
  },
  {
    question: "How do I contact the hostel owners?",
    answer:
      "Each hostel listing includes contact details. You can call or message the owners directly to ask questions or arrange visits.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

    const animatedElements = containerRef.current.querySelectorAll(`.${styles.animateOnScroll}`);
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.faq}`} ref={containerRef}>
      <h2 className={`${styles.h2} ${styles.animateOnScroll}`}>Frequently Asked Questions</h2>
      {faqData.map((item, idx) => (
        <div className={`${styles.faqItem} ${styles.animateOnScroll}`} key={idx}>
          <h3 onClick={() => handleClick(idx)} className={styles.faqQuestion}>
            {item.question}
          </h3>
          {openIndex === idx && (
            <p className={styles.faqAnswer}>{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQ;