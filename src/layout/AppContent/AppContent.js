import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// routes config
import routes from '../../routes';

const loading = (
  <div className='loading'>
    <div className='spinner-grow text-danger' role='status'></div>
  </div>
);

const AppContent = () => {
  return (
    <div className='container-fluid h-100 p-lg-3 p-md-2 p-sm-2'>
      <Suspense fallback={loading}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path='/' element={<Navigate to='dashboard' replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default React.memo(AppContent);
