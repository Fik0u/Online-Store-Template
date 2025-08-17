import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Product = (product) => {

  return (
    <div>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.product.imageUrl} />
      <Card.Body>
        <Card.Title>{product.product.title}</Card.Title>
        <Card.Text>
          {product.product.description}
        </Card.Text>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Product
