import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import EditProd from './EditProd';
import { deleteProd } from '../JS/actions/prodAction';

const Product = (product) => {

  const dispatch = useDispatch();

  const handleDelete = () => {
      dispatch(deleteProd(product.product._id));
  };

  const user = useSelector(state => state.authReducer.user);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
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
          <Button variant="primary">Add to cart</Button>
        )}
      </Card.Body>
    </Card>
    </div>
  )
}

export default Product
