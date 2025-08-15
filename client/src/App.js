import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Welcome to The Store</h1>
      <p>Your one-stop shop for all your needs!</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
