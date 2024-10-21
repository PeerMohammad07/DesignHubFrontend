import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../Interfaces/IUserData';
import { userLogout } from '../../Redux/Slices/userSlice';
import { logoutApi } from '../../Api/userApi';

const Navbar = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state: rootState) => state.user.userData)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const logout = async ()=>{
    await logoutApi()
    dispatch(userLogout())
  }

  return (
    <div className={`navbar-container ${isOpen ? 'menu-open' : ''}`}>
      <Link to="/">
        <img src="logoIcon.png" alt="Logo" />
      </Link>
      <div className="nav-elements">
        <ul>
          <li><Link to="/websites">WEBSITES</Link></li>
          <li><Link to="/templates">TEMPLATES</Link></li>
        </ul>
        <div className='button-container'>
          {userData ? 
          <>
            <h4 className='user-name'>{userData.name}</h4>
            <Link to="/templates" className="button get-started-button">GET STARTED</Link>
            <button className="button logout-button" onClick={logout}>LOG OUT</button>
          </> :
            <>
              <Link to="/login" className="button login-button">LOG IN</Link>
              <Link to="/" className="button get-started-button">GET STARTED</Link>
            </>
          }
        </div>
      </div>
      <button className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default Navbar;