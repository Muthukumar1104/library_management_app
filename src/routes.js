import React from 'react';

const Books = React.lazy(() => import('./views/Pages/Book/All_book/All_book'));
const Members = React.lazy(() =>
  import('./views/Pages/Member/All_companies/All_member')
);

const routes = [
  { path: '/book', name: 'Contacts', element: Books, exact: true },
  { path: '/member', name: 'Deals', element: Members, exact: true },
];

export default routes;
