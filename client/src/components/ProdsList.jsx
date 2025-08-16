import React from 'react'
import Product from './Product'

const ProdsList = ({ products }) => {

  return (
    <div>
      Products List
    {products.map((prod) => <Product key={prod._id} product={prod} />)}
    </div>
  )
}

export default ProdsList
