import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import NavBar from './components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './JS/actions/authAction';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import ProdDetails from './pages/ProdDetails';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import AllOrders from './components/AllOrders';
import MyOrders from './components/MyOrders';

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.authReducer.isAuth);
  const user = useSelector(state => state.authReducer.user);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(currentUser());
    }
  }, [dispatch]);


  return (
    <div className="App">
      <NavBar />
      <h1>Welcome to The Store</h1>
      <p>Your one-stop shop for all your needs!</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProdDetails />} />
        {isAuth ? (
          <>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Checkout />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          </>
        ) : (
          <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
          </>
        )}
        
        {/* Private Route for Admin Dashboard */}
        {user && user.isAdmin && (
          <>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/orders" element={<AllOrders />} />
          </>
        )}

        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
