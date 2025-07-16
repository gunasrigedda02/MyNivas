import React, { useEffect, useState } from 'react';
import styles from './Write.module.css';

function Write() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: formData.name,
          email: formData.email,
          subject: formData.subject,
          comment: formData.message,
          rating: formData.rating,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Review submitted successfully!');
        setFormData({ name: '', email: '', subject: '', message: '', rating: '' });
      } else {
        alert('Failed to submit review: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Something went wrong. Please try again.');
    }
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

    document.querySelectorAll(`.${styles.animateOnScroll}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.writeContainer} ${styles.animateOnScroll}`}>
      <div className={styles.writeImageContainer}>
        <img src="/Home/Write/write.png" alt="Contact Background" className={styles.writeImage} />
      </div>
      <div className={styles.writeFormContainer}>
        <form className={styles.writeForm} onSubmit={handleSubmit}>
          <h1 className={styles.writeTitle}>Write Us</h1>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className={styles.formInput}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={styles.formInput}
            required
          ></textarea>
          <div className={styles.starRating}>
            <label>Rating:</label>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${formData.rating >= star ? styles.filled : ''}`}
                  onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Write;