import React from 'react'
import AddProd from '../components/AddProd'

const Dashboard = () => {
  return (
    <div>
      This is the Admin Dashboard
      <p>Here you can manage users, products, and orders.</p>
      <AddProd />
    </div>
  )
}

export default Dashboard
