import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../JS/actions/orderAction';

const Checkout = () => {

  const cartItems = useSelector(state => state.cartReducer.cartItems);
  const totalAmount = useSelector(state => state.cartReducer.totalAmount);

  const [orderDetails, setOrderDetails] = useState({
    address: '',
    paymentMethod: 'Credit Card',
  });

  const [processing, setProcessing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevState => ({
      ...prevState, [name]: value
    }))
  };

  const handlePlaceOrder = () => {
    if (!orderDetails.address || !orderDetails.paymentMethod) {
      alert('Please fill in all required fields.');
      return;
    }
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    setProcessing(true);
    const newOrder = {
      products: cartItems.map(item => ({
        product : item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: totalAmount,
      address: orderDetails.address,
      paymentMethod: orderDetails.paymentMethod
    };
    dispatch(addOrder(newOrder, navigate));
    setProcessing(false);
  };


  return (
    <div>
      <h3>Order Checkout</h3>
      <div>
        <label>Shipping Address</label>
        <input type="text" name="address" placeholder='Enter the address' value={orderDetails.address} onChange={handleInputChange} required />
      </div>
      <div>
        <label>Payment Method</label>
        <select name="paymentMethod" value={orderDetails.paymentMethod} onChange={handleInputChange} required>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>
      <div>
        <h4>Order Summary</h4>
        {cartItems.map(item => (
          <div key={item.product._id}>
            <p>{item.product.title} - {item.quantity} x {item.product.price} $</p>
          </div>
        ))}
        <p>Total : ${totalAmount}</p>
      </div>
      <button onClick={handlePlaceOrder} disabled={processing}>
        {processing ? 'Processing...' : 'Place Order'}
      </button>
      {processing && <p>Your order is being processed...</p>}
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
    </div>
  )
}

export default Checkout
