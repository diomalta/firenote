import React from 'react';
import { Consumer } from '../../services/contextApi';
 
const Flash = () => (
  <Consumer>
    {({ flashMessage }) => (
      <h1>{flashMessage}</h1>
    )}
  </Consumer>
);

export default Flash;

