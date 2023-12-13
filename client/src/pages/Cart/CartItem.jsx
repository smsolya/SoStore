import React, { useEffect, useState } from 'react';

const CartItem = ({ id, name, type, image, price, quantity, setCartItems, cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(price * quantity);
  const addQuantity = () => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === id);
    const updatedProductItems = [...cartItems];
    updatedProductItems[existingProductIndex].quantity += 1;
    setCartItems(updatedProductItems);
  };

  const minusQuantity = () => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === id);
    const updatedProductItems = [...cartItems];
    updatedProductItems[existingProductIndex].quantity -= 1;
    setCartItems(updatedProductItems);
  };

  const onRemove = () => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === id);
    const updatedProductItems = [...cartItems];
    updatedProductItems[existingProductIndex].quantity = 0;
    setCartItems(updatedProductItems);
  };

  useEffect(() => {
    setTotalPrice((price * quantity).toFixed(2));
  }, [quantity]);

  return (
    <div>
      {quantity !== 0 && (
        <div class="cart-item">
          <div class="image-box">
            <img class="cart-item-image" src={image} />
          </div>
          <div class="cart-about">
            <h1 class="title">{name}</h1>
            <h3 class="subtitle">{type}</h3>
          </div>


          <div class="counter">
            <div class="btn" onClick={addQuantity}>
              +
            </div>
            <div class="count">{quantity}</div>
            <div class="btn" onClick={minusQuantity}>
              -
            </div>
          </div>

          <div class="prices">
            <div class="amount">${totalPrice}</div>

            <div class="remove" onClick={onRemove}>
              <u>Remove</u>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
