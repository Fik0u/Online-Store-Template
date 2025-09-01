import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeItem, updateItem } from '../JS/actions/cartAction';
import { Button, Form } from 'react-bootstrap';


const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartReducer.cartItems);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedItems) {
      storedItems.forEach(item => {
        if (!cartItems.find(cartItem => cartItem.product._id === item.product._id)) {
          dispatch(updateItem(item.product._id, item.quantity));
        }
      })
    }
  }, [dispatch, cartItems]);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateItem(productId, Number(quantity))); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.removeItem('cartItems');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart 🛒</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product._id}>
              <h6>{item.product.title}</h6>
              <p>Price: ${item.product.price}</p>
              <Form.Control type='number' value={item.quantity} min="1" onChange={(e) => handleQuantityChange(item.product._id, e.target.value)} />
              <p>Total : ${(item.product.price * item.quantity).toFixed(2)}</p>
              <div>
                <Button variant="danger" onClick={() => handleRemove(item.product._id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div>
          <h3>Total: <span>${totalPrice.toFixed(2)}</span></h3>
          <div>
            <Button variant="warning" onClick={handleClearCart}>Clear Cart</Button>
            <Button variant="success">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
