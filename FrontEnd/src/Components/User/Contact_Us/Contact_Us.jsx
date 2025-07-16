import React, { useState } from 'react';
import styles from './Contact_Us.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFeedback({ message: 'Please fill out all fields.', type: 'error' });
      return;
    }

    setTimeout(() => {
      setFeedback({ message: 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  return (
    <>
      <div className={styles.pageContainer} style={{ marginTop: '2rem' }}>
        <main className={styles.mainContent}>
          <div className={styles.grid}>
            <div
              className={styles.gridHeadings}
              style={{ gridColumn: 'span 12', textAlign: 'center', marginBottom: '2rem' }}
            >
              <h1>Contact Us</h1>
              <h3>Reach out to plan your stay!</h3>
            </div>

            <div className={styles.formContainer}>
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  ></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </form>
              {feedback.message && (
                <p className={styles[feedback.type]}>{feedback.message}</p>
              )}
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.contactCard}>
                <h3>Get in Touch</h3>
                <p>
                  <strong>Address:</strong> Surampalem, East Godavari.
                </p>
                <p>
                  <strong>Phone:</strong> 9876543219
                </p>
                <p>
                  <strong>Email:</strong> info@findhostel.com
                </p>
              </div>
              <div className={styles.contactCard}>
                <h3>Reception Hours</h3>
                <p>Monday - Sunday: 8 AM - 10 PM</p>
                <p>24/7 Check-in Available (Pre-arranged)</p>
              </div>
              <div className={styles.contactCard}>
                <h3>Connect With Us</h3>
                <div className={styles.socialLinks}>
                  <a href="https://facebook.com/wanderlusthostel" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} className={styles.socialIcon} />
                  </a>
                  <a href="https://facebook.com/wanderlusthostel" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} className={styles.socialIcon} />
                  </a>
                  <a href="https://instagram.com/wanderlusthostelnyc" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} className={styles.socialIcon} />
                  </a>
                  <a href="https://x.com/wanderlustnyc" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} className={styles.socialIcon} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactUs;