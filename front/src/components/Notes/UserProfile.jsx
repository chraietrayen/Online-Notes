import  { useState } from "react";
import "./styles/UserProfile.scss";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';


const UserProfile = ({ user }) => {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.username}&flip=true&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&backgroundType=solid,gradientLinear&backgroundRotation=0,10,20&shapeColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,transparent`} alt={`${user.name}'s Profile`} />
        <h2>{user.username}</h2>
        <button
          className="menu-toggle-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          ...
        </button>
      </div>
      {menuOpen && (
        <div className="menu">
          <button className="menu-item" onClick={()=>navigate("/settings")}>Settings</button>
          <button className="menu-item" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
