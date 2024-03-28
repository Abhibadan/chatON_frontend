import React from 'react'
import { NavLink,useLocation,useNavigate } from 'react-router-dom'
const Navbar=({user,socket,setSocket})=> {
  const location=useLocation();
  const navigation=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('Auth');
    socket.emit("offline",{user_id: user._id,socket_id:socket.id});
    socket.disconnect(); 
    setSocket(null);
    navigation('/login');
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              
              {user?._id && localStorage.hasOwnProperty('token')?<li className="nav-item">
                <NavLink to="/chat" className={`nav-link ${location.pathname=='/chat'?"active":""}`} aria-current="page">
                  Chat
                </NavLink>
              </li>:<li className="nav-item">
                <NavLink to="/login" className={`nav-link ${location.pathname=='/login'?"active":""}`} aria-current="page">
                  Login
                </NavLink>
              </li>}
              <li className="nav-item">
                <NavLink to="/test" className={`nav-link ${location.pathname=='/test'?"active":""}`}>
                  Test
                </NavLink>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={logout}>Logout</a>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar
