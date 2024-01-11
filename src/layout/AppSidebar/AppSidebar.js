import React from 'react';
import '../../assets/css/style.css';
import { NavLink } from 'react-router-dom';

const AppSidebar = (props) => {
  const { menuToggle, setMenuToggle } = props.commonProps;
  return (
    <div
      class='border-end bg-white'
      id='sidebar-wrapper'
      style={{
        display: menuToggle ? 'none' : 'block',
      }}
    >
      <div class='sidebar-heading'>CRM</div>
      <div class='list-group list-group-flush'>
        <NavLink
          className='list-group-item list-group-item-action list-group-item-light p-3'
          to={'/book'}
        >
          Books
        </NavLink>
        <NavLink
          className='list-group-item list-group-item-action list-group-item-light p-3'
          to={'/member'}
        >
          Members
        </NavLink>
      </div>
    </div>
  );
};

export default AppSidebar;
