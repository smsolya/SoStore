import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from '../../assets/image/logo.svg';
import storyImage from '../../assets/image/toa-heftiba-GLl6_-L3fxM-unsplash.jpg';
import whyUsLogo1 from '../../assets/image/secure.jpg';
import whyUsLogo2 from '../../assets/image/deliver.jpg';
import whyUsLogo3 from '../../assets/image/service.jpg';
import ProductCard from '../../components/ProductCard';
import CartLogo from '../../components/CartLogo'
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './MainPage.css';
import { Badge, Button, IconButton, Menu, MenuItem, Modal, Pagination, Stack, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsAuth } from '../../store/reducers/FilterSlice';
import MessageIcon from '@mui/icons-material/Message';
import ContactPageIcon from '@mui/icons-material/ContactPage';


const ReviewsPerPage = 6;

const MainPage = ({ productItems }) => {

  /* const reviews = [
     {
       review: " Most of my decorative cosmetics collection consists of products bought here. The quality of their goods is always top- notch, and the service is very pleasant.",
       img: client1,
       name: "YULIA VERBYNETS"
     },
     {
       review: " This store is my favorite place to shop for decorative cosmetics! They always have awide range of products that meet all my needs. I love their promotions and expertadvice. Highly recommended!",
       img: client2,
       name: "DASHA ASTAFIEVA"
     },
     {
       review: " Most of my decorative cosmetics collection consists of products bought here. Thequality of their goods is always top-notch, and the service is very pleasant. I'm ahappy customer, and I will definitely be back",
       img: client3,
       name: "NADYA DOROFEEVA"
     },
   ]*/


  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [itemsPerPage] = useState(6);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/reviews/getAllReviews');

        if (response.ok) {
          const reviewsData = await response.json();
          setReviews(reviewsData);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAllReviews();
  }, [reviews]);



  const [randomImages, setRandomImages] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const { email, userRole } = useSelector((state) => state.FilterReducer);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.localStorage.removeItem('isAuth');
    window.localStorage.removeItem('role');
    dispatch(updateIsAuth(false))
    navigate('/login');
    handleClose();
  };

  useEffect(() => {
    const fetchRandomImages = async () => {
      const images = await Promise.all(Array.from({ length: ReviewsPerPage }, () => getRandomImage()));
      setRandomImages(images);
    };

    fetchRandomImages();
  }, []);

  const getRandomImage = async () => {
    try {
      const response = await fetch('https://picsum.photos/200/200');
      const imageSrc = response.url;
      return imageSrc;
    } catch (error) {
      console.error('Failed to fetch random image:', error);
      return null;
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItem, setCurrentPageItem] = useState(1);

  const handleOpenFeedbackModal = () => {
    setFeedbackModalOpen(true);
  };

  const handleCloseFeedbackModal = () => {
    setFeedbackModalOpen(false);
  };

  const handleFeedbackSubmit = async () => {
    if (name && feedback) {
      try {
        const response = await fetch('http://localhost:5000/reviews/addReview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            description: feedback,
          }),
        });

        if (response.ok) {
          setReviews((prevReviews) => {
            const newReview = {
              name: name,
              description: feedback,
            };
            return [newReview, ...prevReviews];
          });

          handleCloseFeedbackModal();
          setName('');
          setFeedback('');
        } else {
          console.error('Failed to submit feedback');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const indexOfLastReview = currentPage * ReviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - ReviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const indexOfLastItem = currentPageItem * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handlePageItem = (event, value) => {
    setCurrentPageItem(value);
  };
  return (
    <div>
      <header>
        <div className="top-bar">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cosmetics">Cosmetics</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/cart">
                  <CartLogo className='cart-image' />
                </Link>
              </li>
              {userRole === 'ADMIN' && (
                <Link to="/addgoods">
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={0} color="error">
                      <AddCircleIcon style={{ color: "white" }} />
                    </Badge>
                  </IconButton>
                </Link>
              )}
              {userRole === 'ADMIN' && (
                <Link to="/contactAdmin">
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={0} color="error">
                      <MessageIcon style={{ color: "white" }} />
                    </Badge>
                  </IconButton>
                </Link>
              )}
              {userRole === 'ADMIN' && (
                <Link to="/orders">
                  <IconButton size="large" color="inherit">
                    <Badge badgeContent={0} color="error">
                      <ContactPageIcon style={{ color: "#fff" }} />
                    </Badge>
                  </IconButton>
                </Link>
              )}
              <li>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <PersonIcon style={{ border: "1px solid #fff", borderRadius: "30%" }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile {email}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </li>
            </ul>
          </nav>
        </div>
        <div className="header_content_wrap">
          <div className="header-content">
            <h6>Welcome To The SOstore</h6>
            <h1>Where beauty finds its home</h1>
            <div className="button_wrap">
              <Link className="button_shop" to="/cosmetics">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="products">
        <div className="products_title">
          <h2>New Cosmetics</h2>
          <div className="button_wrap">
            <Link className="button_shop" to="/cosmetics">
              Shop Now
            </Link>
          </div>
        </div>

        <div className="products_section">
          {currentItems.map(({ id, img, name, type, price }) => (
            <ProductCard id={id} image={`http://localhost:5000/static/${img}`} name={name} type={type} price={price} key={id} />
          ))}
        </div>
        <Stack spacing={2} justifyContent="center" >
          <Pagination
            count={Math.ceil(productItems.length / itemsPerPage)}
            page={currentPageItem}
            onChange={handlePageItem}
          />
        </Stack>
      </section>

      <section className="our_story">
        <div className="our_story_img">
          <img src={storyImage} alt="" />
        </div>
        <div className="our_story_text">
          <h6>Our Story</h6>
          <h2>For People Who Love Beauty</h2>
          <p>
            Our mission is to provide the best solutions for those who appreciate beauty in
            everything. From exclusive cosmetic products to everyday skincare items, we create a
            world for you where every moment reflects your unique beauty.
          </p>
          <p>With us, beauty will find its true home.</p>
          <div className="button_wrap">
            <Link className="button_shop" to="/about">
              Read More
            </Link>
          </div>
        </div>
      </section>

      <section className="customer_reviews">
        <h2>What Our Customers Say</h2>
        <div className="review_wrap" >
          {currentReviews.map((review, index) => (
            <div className="review" key={index} style={{ width: "calc(33.33% - 20px)" }}>
              <div>
                <img src={review.img || randomImages[index]} alt={`Client ${index + 1}`} />
                <p>{review.name}</p>
              </div>
              <p>
                {review.description}
              </p>
            </div>
          ))}
        </div>
        <Pagination
          style={{ marginLeft: "20px" }}
          count={Math.ceil(reviews.length / ReviewsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
        <button onClick={handleOpenFeedbackModal} style={{ background: "rgb(30, 109, 71)", color: "#fff", border: "none", }} className='button_shop' >Give feedback</button>
        <Modal open={isFeedbackModalOpen} onClose={handleCloseFeedbackModal}>
          <div className="feedback_modal">
            <div className="modal-content">
              <h2>Feedback</h2>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
              />
              <TextField
                label="Feedback"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                margin="normal"
              />
              <Button
                variant="contained"
                style={{ background: 'rgb(30, 109, 71)', color: '#fff', marginTop: '16px' }}
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </Button>
              <Button
                variant="contained"
                style={{ background: 'rgb(30, 109, 71)', color: '#fff', marginTop: '16px', marginLeft: "10px" }}
                onClick={handleCloseFeedbackModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </section>

      <section className="gift_card">
        <div>
          <h6>GIFT CARD</h6>
          <h3>Give the Gift of Cosmetics</h3>
          <p>Gift certificate for cosmetic expenses — For your best version of yourself.</p>
          <div className="button_wrap">
            <a className="button_shop" href="#">
              Purchase A Gift Card
            </a>
          </div>
        </div>
      </section>

      <section className="why_us">
        <div>
          <img src={whyUsLogo1} alt="" />
          <p>SECURE PAYMENT</p>
        </div>
        <div>
          <img src={whyUsLogo2} alt="" />
          <p>DELIVERED WITH CARE</p>
        </div>
        <div>
          <img src={whyUsLogo3} alt="" />
          <p>EXCELLENT SERVICE</p>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
