import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProdsList from '../components/ProdsList'
import { getAllProds } from '../JS/actions/prodAction';


const Home = () => {

  const dispatch = useDispatch();
  const prodsList = useSelector((state) => state.prodReducer.prodsList)

  useEffect(() => {
    dispatch(getAllProds())
  }, [dispatch])

  return (
    <div>
      Home Page
        <img src="https://cdn.shopify.com/s/files/1/0070/7032/articles/opening_an_online_store_tips.png?v=1742562469"
          alt="Home page"
          style={{ width: "100%", marginTop: "40px" }} />

        <ProdsList products={prodsList} />
    </div>
  )
}

export default Home
