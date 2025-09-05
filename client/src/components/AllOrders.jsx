import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateStatus } from '../JS/actions/orderAction';
import { Link } from 'react-router-dom';

const AllOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orderReducer.orders);
    const [statusUpdate, setStatusUpdate] = useState({});

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    useEffect(() => {
        if (orders && orders.length > 0) {
            const initialStatus = {};
            orders.forEach(order => {
                initialStatus[order._id] = order.status;
            });
            setStatusUpdate(initialStatus);
        }
    }, [orders]);

    const handleStatusChange = (orderId, newStatus) => {
        setStatusUpdate(prev => ({ ...prev, [orderId]: newStatus }))
    };

    const handleUpdate = (orderId) => {
        const newStatus = statusUpdate[orderId];
        if (newStatus) {
            dispatch(updateStatus(orderId, newStatus));
            setStatusUpdate(prev => ({ ...prev, [orderId]: newStatus }));
        }
    };


  return (
    <div>
        <h2>All Orders</h2>
        {orders && orders.length > 0 ? (
            <div>
                {orders.map(order => (
                    <div key={order._id}>
                        <div>
                            <p><strong>Customer : {order.user.name}</strong></p>
                            <p><strong>Total : ${order.total}</strong></p>
                            <p><strong>Status : {order.status}</strong></p>
                        </div>
                        <div>
                            <label>Update Status</label>
                            <select value={statusUpdate[order._id] || order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <div>
                                <button onClick={() => handleUpdate(order._id)}>Update</button>
                                <Link to={`/order/${order._id}`}>View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p>No orders found.</p>
        )}
    </div>
  )
}

export default AllOrders
