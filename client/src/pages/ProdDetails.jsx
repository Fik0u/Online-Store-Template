import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../JS/actions/cartAction';
import { getOneProd } from '../JS/actions/prodAction';

const ProdDetails = () => {
    const params = useParams();
    const dispatch  = useDispatch();
    const prod = useSelector(state => state.prodReducer.product);

    
    const handleAddToCart = () => {
        dispatch(addToCart(prod, 1));
    };
    
    useEffect(() => {
        dispatch(getOneProd(params.id));
    }, [dispatch, params.id]);

    if (!prod) {
        return <p>Loading...</p>;
    }

  return (
    <div>
        <img src={prod.imageUrl} alt={prod.title} />
        <div>
            <h3>{prod.title}</h3>
            <p>{prod.description}</p>
            <p><strong>${prod.price}</strong></p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProdDetails
