import React, { useState } from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';
import AppHeader from '../AppHeader/AppHeader';
import AppContent from '../AppContent/AppContent';

const DefaultLayout = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const commonProps = {
    menuToggle: menuToggle,
    setMenuToggle: setMenuToggle,
  };

  return (
    <div class='d-flex' id='wrapper'>
      {/* <!-- Sidebar--> */}
      <AppSidebar commonProps={commonProps} />
      <div id='page-content-wrapper'>
        {/* <!-- Top navigation--> */}
        <AppHeader commonProps={commonProps} />
        {/* <!-- Page content--> */}
        <div class='container-fluid scroll_bar_body pb-4'>
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
