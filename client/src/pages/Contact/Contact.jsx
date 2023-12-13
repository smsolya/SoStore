import React, { useState } from 'react';
import './Contact.css';
import Header from '../../components/Header';
import linkImage1 from '../../assets/image/map_marker.png';
import linkImage2 from '../../assets/image/phone.png';
import linkImage3 from '../../assets/image/email.png';
import { Input, TextField, TextareaAutosize } from '@mui/material';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiUrl = 'http://localhost:5000/contacts/add';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Contact added successfully:', responseData);
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div>
      <Header />
      <section className="contact">
        <div className="leftBar">
          <h1>Get In Touch</h1>

          <div>
            <img src={linkImage2} alt="" />
            <div>
              <h6>CALL US</h6>
              <a className="contact-links" href="tel:+380975557777">
                +380 97 555 7777
              </a>
            </div>
          </div>

          <div className="rightBar">
            <img src={linkImage3} alt="" />
            <div>
              <h6>EMAIL US</h6>
              <a className="contact-links" href="mailto:mail@example.com" target="_blanc">
                mail@example.com
              </a>
            </div>
          </div>
          <div>
            <img src={linkImage1} alt="" />
            <div>
              <h6>VISIT US</h6>
              <a
                className="contact-links"
                href="https://maps.app.goo.gl/8fKfpkud1EQpyq9o8"
                target="_blanc">
                77 Shevchenko St., Kyiv, 38053, Ukraine
              </a>
            </div>
          </div>
          <iframe
            title="Google Maps"
            width="600"
            height="190"
            frameBorder="0"
            style={{ border: 0, }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7078.600302301505!2d30.254624929545276!3d50.41500561964692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x472b353236117175%3A0x4b11e653a2915bb8!2z0LLRg9C70LjRhtGPINCo0LXQstGH0LXQvdC60LAsIDc3LCDQqNC10LLRh9C10L3QutC-0LLQtSwg0JrQuNGX0LLRgdGM0LrQsCDQvtCx0LsuLCAwODE0MA!5e0!3m2!1suk!2sua!4v1701201272195!5m2!1suk!2sua"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <h3>Drop us a line or two</h3>
          <form className="formStyle" onSubmit={handleSubmit}>
            <TextField style={{ marginBottom: "20px", width: "300px" }} label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            <TextField style={{ marginBottom: "20px", width: "300px" }} label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextareaAutosize style={{ height: "80px", padding: "20px" }} aria-label="empty textarea" placeholder="Enter your message" maxLength={200} minRows={4} value={message} onChange={(e) => setMessage(e.target.value)}></TextareaAutosize>
            <input type="submit" value="Submit" className="button" />
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
