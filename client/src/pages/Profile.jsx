import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate = useNavigate();
  const user = useSelector(state => state.authReducer.user);

  return (
    <div>
      Profile Page
      <p>Welcome to your profile!</p>
      {!user.isAdmin && (
        <button onClick={() => navigate('/myorders')}>My Orders History</button>
      )}
    </div>
  )
}

export default Profile
