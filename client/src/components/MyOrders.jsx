import React, { useEffect } from 'react'    
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../JS/actions/orderAction';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const MyOrders = () => {

    const dispatch = useDispatch();
    const myOrders = useSelector(state => state.orderReducer.myOrders);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

  return (
    <div>
      <h2>Order History</h2>
      {myOrders && myOrders.length > 0 ? (
        myOrders.map(order => (
            <Link key={order._id} to={`/order/${order._id}`}>
                <Card>
                    <Card.Body>
                    <div>
                      <div>
                        <p>Order ID: <span>{order._id}</span></p>
                        <p><strong>Status:</strong> <span>{order.status}</span></p>
                      </div>
                      <div>
                        <p><strong>Total:</strong> {order.total} $</p>
                        <p><strong>Shipping:</strong> {order.shippingAddress}</p>
                        <p><strong>Payment:</strong> {order.paymentMethod}</p>
                      </div>
                    </div>
      
                    <h5>📦 Products:</h5>
              {order.products.map((item, index) => (
                <div key={index}>
                  <div>
                    <p>{item.product.title}</p>
                    <div>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.product.price} $</p>
                    </div>
                  </div>
                </div>
              ))}
                  </Card.Body>
                </Card> 
            </Link>
        ))
      ) : (
        <p>You have no orders yet.</p>
      )}
    </div>
  )
}

export default MyOrders
