import React from "react";

import { Container, Title, Logout } from "./styles";

const handleLogout = () => localStorage.clear();

const Header = () => (
  <Container>
    <Title>Anotações</Title>
    <Logout href="/signin" onClick={handleLogout}>
      <i className="fas fa-power-off" />
      Sair
    </Logout>
  </Container>
);

export default Header;
