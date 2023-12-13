import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './Cart.css';
import CartItem from './CartItem';
import { Link, json } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
  const [totalQuantity, setTotalQuantity] = useState(
    cartItems.reduce((total, item) => total + item.quantity, 0),
  );
  const [totalPrice, setTotalPrice] = useState(
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0),
  );

  const cart = cartItems.length ? cartItems : JSON.parse(localStorage.getItem('cartItems'))
  console.log('CART', cart)
  const [saveCart, setSaveCart] = useState(cart || [])

  useEffect(() => {
    setTotalQuantity(cartItems.reduce((total, item) => total + item.quantity, 0));
    setTotalPrice(cartItems.reduce((total, item) => total + item.quantity * item.price, 0));
    localStorage.setItem('cartItems', JSON.stringify(saveCart));
  }, [saveCart]);

  const removeAll = () => {
    setSaveCart([]);
    localStorage.removeItem("cartItems")
  }


  return (
    <div>
      <Header />

      <section className="cart-wrapper">
        <div className="cart-container">
          <div className="cart-header">
            <h3 className="cart-heading">Shopping Cart</h3>
            <h5 className="cart-action" onClick={removeAll}>
              Remove all
            </h5>
          </div>

          {saveCart.length ? (
            <>
              {saveCart.map(({ id, name, type, image, price, quantity }) => (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  type={type}
                  image={image}
                  price={price}
                  quantity={quantity}
                  setCartItems={setSaveCart}
                  cartItems={saveCart}
                />
              ))}

              <div className="checkout">
                <div className="total">
                  <div>
                    <div className="subtotal">Sub-Total</div>
                    <div className="items">{totalQuantity}</div>
                  </div>
                  <div className="total-amount">${totalPrice.toFixed(2)}</div>
                </div>
                {totalPrice !== 0 ? (
                <Link style={{ textDecoration: "none" }} to={"/checkout"}>
                  <button className="button submit">Checkout</button>
                </Link>
              ) : (
                <button className="button submit" disabled>
                  Checkout
                </button>
              )}
              </div>
            </>
          ) : (
            <div className="empty-cart">Cart is Empty</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;

