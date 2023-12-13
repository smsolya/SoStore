import React, { useState } from 'react';
import { Modal, Box, Typography} from '@mui/material';

const ProductCard = ({ id, image, name, type, price }) => {

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <div className="product" key={id}>
      <img src={image} alt={id} onClick={handleOpenModal} />
      <h3>{name}</h3>
      <p>{type}</p>
      <p>${price}</p>
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
    </div>
  );
};

export default ProductCard;
