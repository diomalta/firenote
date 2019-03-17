import React from 'react';

const Anotation = React.lazy(() => import('../pages/Anotation'));
const Categories = React.lazy(() => import('../pages/Categories'));
const Posts = React.lazy(() => import('../pages/Posts'));

const routes = [
  { path: '/categories', exact: true, component: Categories },
  { path: '/subcategories/:id/anotation/:id', exact: true, name: 'Theme', component: Anotation },
  { path: '/anotations/:id', exact: true, name: 'Home', component: Posts },
];

export default routes;