import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditProd from './EditProd';
import { deleteProd } from '../JS/actions/prodAction';


const Product = (product) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
  
  const handleDelete = () => {
      dispatch(deleteProd(product.product._id));
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
      <Link to={`/product/${product.product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card.Img variant="top" src={product.product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.product.title}</Card.Title>
        <Card.Text>
          {product.product.description}
        </Card.Text>
        {user.isAdmin ? (
          <>
          <EditProd product={product} />
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </>
        ) : (
          <Button variant="primary">View Details</Button>
        )}
      </Card.Body>
      </Link>
    </Card>
    </div>
  )
}

export default Product
