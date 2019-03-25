import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  min-height: 100%;
  min-width: 80px;
  background: #282A36;
  color: #b3b3b3;
  border-right: 0.01rem solid #2C2E3D;

  > div {
    padding: 25px;
  }
`;

export const Nav = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  /* padding-inline-start: 40px; */
  list-style: none;

  &:first-child {
    margin: 0;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 70px;
    background: #FB2F51;
    margin-bottom: 10px;

    img {
      height: 32px;
      width: 32px;
      margin-bottom: 10px;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;


    img {
      height: 24px;
      width: 24px;
      margin-bottom: 10px;
    }

    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: rgb(140, 132, 155);
      font-size: 12px;
      transition: all 0.1s ease 0s;
      border-width: 0px;
      border-style: initial;
      border-color: initial;
      border-image: initial;
      text-decoration: none;
      height: 80px;
      -webkit-touch-callout: none;
      -webkit-user-select: none; 
      -khtml-user-select: none; 
        -moz-user-select: none; 
          -ms-user-select: none; 
              user-select: none; 
      cursor: pointer;

      &:hover {
        color: #fff;
        background: #1E1B26;
        width: 100%;
      }
    }

    span {
      font-size: 11px;
      text-transform: uppercase;
      line-height: 22px;
      letter-spacing: 1.11px;
      font-weight: 300;
    }
  }
`;

export const NewPlaylist = styled.button`
  background: transparent;
  border: 0;
  border-top: 1px solid #282828;
  font-size: 13px;
  color: #b3b3b3;
  display: flex;
  align-items: center;
  padding: 15px 25px;

  &:hover {
    color: #fff;
  }

  img {
    margin-right: 10px;
  }
`;