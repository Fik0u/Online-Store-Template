import React from 'react'
import AddProd from '../components/AddProd'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      This is the Admin Dashboard
      <p>Here you can manage users, products, and orders.</p>
      <Link to={'/admin/orders'}>View Orders List</Link>
      <AddProd />
    </div>
  )
}

export default Dashboard
