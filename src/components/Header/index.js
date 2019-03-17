import React from 'react';

import { Container, Title, Logout } from './styles';

const handleLogout = () => localStorage.clear();

const Header = () => (
  <Container>
    <Title>
      Anotações
    </Title>
    <Logout href="/#/signin" onClick={handleLogout}>
      <i class="fas fa-power-off"></i>
      Sair
    </Logout>
  </Container>
);

export default Header;