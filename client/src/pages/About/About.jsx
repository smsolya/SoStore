import React from 'react';
import Header from '../../components/Header';
import './About.css';
import aboutImage from '../../assets/image/2023-10-10 21.08.56.jpg';
import founder1 from '../../assets/image/Solya.jpg';
import founder2 from '../../assets/image/Oksana.jpg';
import gallery1 from '../../assets/image/gallery1.jpg';
import gallery2 from '../../assets/image/gallery2.jpg';
import gallery3 from '../../assets/image/gallery3.jpg';
import gallery4 from '../../assets/image/gallery4.jpg';
import gallery5 from '../../assets/image/gallery5.jpg';
import gallery6 from '../../assets/image/gallery6.jpg';

const About = () => {
  return (
    <div>
      <Header />
      <section className="about">
        <div className="about_text">
          <div>
            <h1>About</h1>
          </div>
          <div>
            <p>__________</p>
            <h3>We sell you self-expression and confidence</h3>
            <p>
              Our mission is to provide the best solutions for those who appreciate beauty in
              everything. From exclusive cosmetic products to everyday skincare items, we create a
              world for you where every moment reflects your unique beauty. With us, beauty will
              find its true home.
            </p>
          </div>
        </div>
        <div>
          <img src={aboutImage} alt="" />
        </div>
      </section>

      <section className="our_story">
        <div>
          <h3>OUR STORY</h3>
        </div>
        <div>
          <p>
            In this world of beauty, we are dedicated to offering not just products but also
            guidance, inspiration, and a sense of community. We believe that beauty goes beyond skin
            deep, and it encompasses self-expression, confidence, and empowerment.
          </p>
          <p>
            Join us on this journey where we celebrate your individuality, where we enhance your
            natural beauty, and where we foster a sense of belonging. With us, you’ll not only look
            your best but also feel your best, because true beauty begins from within. Discover the
            place where your beauty is cherished and nurtured. Welcome to your true beauty
            destination
          </p>
          <div className="reviewBlock">
            <p>
              Our store is a place where everyone can find not only cosmetics but also beauty and
              confidence. We strive to provide our customers with the best products for self-care
              that emphasize their natural beauty. Our team always works to make it comfortable and
              easy for you to find what you need. We take pride in our selection, service quality,
              and commitment to our customers. Thank you for choosing us for your purchases.
            </p>
            <div className="reviewFounders">
              <div className="founder">
                <img className="founderImage" src={founder1} alt="Founder" />
                <div>
                  <p>SOLOMIIA HALAN</p>
                  <p>Founder, Owner.</p>
                </div>
              </div>
              <div className="founder">
                <img className="founderImage" src={founder2} alt="Founder" />
                <div>
                  <p>OKSANA LOZYNSKA</p>
                  <p>Founder, Owner.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gallery">
        <img src={gallery1} alt="" />
        <img src={gallery2} alt="" />
        <img src={gallery3} alt="" />
        <img src={gallery4} alt="" />
        <img src={gallery5} alt="" />
        <img src={gallery6} alt="" />
  
      </section>
    </div>
  );
};

export default About;
