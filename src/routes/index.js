import Anotation from '../pages/Anotation';
import Categories from '../pages/Categories';
import Posts from '../pages/Posts';

const routes = [
  { path: '/categories', exact: true, component: Categories },
  { path: '/subcategories/:id/anotation/:id', exact: true, name: 'Theme', component: Anotation },
  { path: '/anotations/:id', exact: true, name: 'Home', component: Posts },
];

export default routes;