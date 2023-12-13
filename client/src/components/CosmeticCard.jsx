import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Box, Typography} from '@mui/material';

const CosmeticCard = ({ id, image, name, type, price, cartItems, setCartItems, notify }) => {

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const onAddToCart = () => {
    const newProduct = {
      id: id,
      image: image,
      name: name,
      type: type,
      price: price,
      quantity: 1,
    };

    const existingProductIndex = cartItems.findIndex((item) => item.id === newProduct.id);

    if (existingProductIndex !== -1) {
      const updatedProductItems = [...cartItems];
      updatedProductItems[existingProductIndex].quantity += 1;
      setCartItems(updatedProductItems);
    } else {
      setCartItems((prevProductItems) => [...prevProductItems, newProduct]);
    }

    notify();
  };

  return (
    <div className="product width" key={id}>
      <img className="cosmeticImage" src={image} alt={id} onClick={handleOpenModal} />
      <h3>{name}</h3>
      <p>{type}</p>
      <p>${price}</p>
      <button className="add-to-cart" onClick={onAddToCart}>
        Add to Cart
      </button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', maxWidth: '90%', maxHeight: '90%', overflow: 'auto', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <img style={{ width: '100%' }} src={image} alt={id} />
          <Typography variant="h4" mt={2}>{name}</Typography>
          <Typography variant="body1">{type}</Typography>
          <Typography variant="body1">${price}</Typography>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              width: "120px",
              marginTop: "3px",
              border: "0",
              background: "rgb(49, 132, 92)",
              color: "#f9f9f9",
              transition: "ease .2s",
              cursor: "pointer",
            }}
            onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
            Close
          </button>
        </Box>
      </Modal>
    </div >
  );
};

export default CosmeticCard;
