import React, { useContext, useState } from 'react';
import { Assets } from '../../assets/Assets';
import { useNavigate } from 'react-router';
import AppContext from '../../Components/Context/Appcontext';
import '../../assets/css/style.css';

const AppHeader = (props) => {
  const { menuToggle, setMenuToggle } = props.commonProps;
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    setUser({ type: 'logout' });
    localStorage.clear();
    navigate('/login');
  };
  return (
    <nav class='navbar navbar-expand-lg navbar-light bg-light border-bottom p-3'>
      <div class='container-fluid'>
        <img
          src={Assets?.list}
          onClick={() => setMenuToggle(!menuToggle)}
          style={{
            cursor: 'pointer',
          }}
          width={26}
        />
        <button
          class='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>
        <div
          class='collapse navbar-collapse'
          id='navbarSupportedContent'
          //   style={{ width: menuToggle ? "block" : "none" }}
        >
          <ul class='navbar-nav ms-auto mt-2 mt-lg-0'>
            <li class='nav-item d-flex'>
              <img
                src={Assets?.person_circle}
                id='navbarDropdown'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                width={25}
              />
              <div
                class='dropdown-menu dropdown-menu-end'
                aria-labelledby='navbarDropdown'
                onClick={(e) => handleLogOut(e)}
              >
                <a class='dropdown-item' href='#!'>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppHeader;
