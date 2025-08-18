import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import EditProd from './EditProd';

const Product = (product) => {

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
          <EditProd product={product} />
        ) : (
          <Button variant="primary">Add to cart</Button>
        )}
      </Card.Body>
    </Card>
    </div>
  )
}

export default Product
