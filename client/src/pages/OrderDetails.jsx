import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneOrder } from '../JS/actions/orderAction';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const order = useSelector(state => state.orderReducer.order);

    useEffect(() => {
        dispatch(getOneOrder(id));
    }, [dispatch, id]);

    if (!order || !order.products) {
        return <p>Order not found</p>
    }

  return (
    <div>
        <h2>Order Details</h2>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.title}</td>
                            <td><strong>{item.price}</strong></td>
                            <td><strong>{item.quantity}</strong></td>
                            <td><strong>{item.price * item.quantity}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
            Total Amount : ${order.total}
        </div>
    </div>
  )
}

export default OrderDetails
