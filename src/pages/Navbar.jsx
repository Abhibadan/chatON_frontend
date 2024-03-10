import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar=()=> {
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
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/test" className="nav-link">
                  Test
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/test" className="nav-link">
                  Test
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar
