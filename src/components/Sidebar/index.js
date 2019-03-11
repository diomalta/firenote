import React, { Component } from 'react';

import { Container, Nav } from './styles';

import BookIcon from '../../assets/images/book.svg';
import FireIcon from '../../assets/images/fire.svg';

 class Sidebar extends Component {
  render() {
    return (
      <Container>
        <Nav>
          <div>
            <img src={FireIcon} alt="logo" />
          </div>
          <li>
            <a href="/">
              <img src={BookIcon} alt="Anotations" />
              Anotação
            </a>
          </li>
        </Nav>
      </Container>
    );
  }
}


export default Sidebar;