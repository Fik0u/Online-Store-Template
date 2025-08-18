import React from 'react'
import Product from './Product'

const ProdsList = ({ products }) => {
// console.log(products)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: "60px auto", gap: "30px", padding: "0 15px" }}>
    
    {products.map((prod) => <Product key={prod._id} product={prod} />)}
    </div>
  )
}

export default ProdsList
