import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 0 30px;
`;

export const Content = styled.div`
  display:flex;
  
  button, a {
    color: rgb(255, 255, 255);
    font-weight: medium;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    height: 40px;
    border-radius: 4px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    text-decoration: none;
    transition: all 0.2s ease 0s;
    padding: 0px 20px;
    background: #614DA3;
    margin-left: 10px;

    i {
      margin-right: 15px;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(255, 255, 255);
    font-size: 25px;
    font-weight: 600;

  span {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 20px;
    background-color: ${props => ( props.color || '#614DA3')};
    border-radius: 7px;
  }

  i {
    margin-left: 10px;
    font-size: 14px;
    font-weight: normal;
    color: rgb(139, 131, 152);
    cursor: pointer;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  margin-top: 40px;
  color: #fff;
`;

export const Category = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  width: 100%;

  h3 {
    font-size: 22px;
    font-weight: 600;

    small {
      margin-left: 25px;
      font-size: 14px;
      font-weight: normal;
      color: rgb(139, 131, 152);
    }
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #282A36;
  border-radius: 10px;
  margin: 5px 0px;

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      cursor: pointer;
      width: 70px;
      height: 70px;
      /* background-color: rgb(251, 47, 81); */
      border-radius: 10px;
      color: rgb(139, 131, 152);

      h1 {
        font-size: 35px;
        font-weight: normal;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-size: 16px;

      a {
        padding: 0;
      }

      small {
        color: rgb(139, 131, 152);
      }
    }
  }

  a {
    color: rgb(255, 255, 255);
    font-size: 20px;
    width: 290px;
    padding: 15px 0px 15px 0px;
    text-decoration: none;

    -webkit-touch-callout: none;
      -webkit-user-select: none; 
      -khtml-user-select: none; 
        -moz-user-select: none; 
          -ms-user-select: none; 
              user-select: none; 
      cursor: pointer;
  }

  h2 {
    font-size: 20px;
    margin-right: 80px;
    color: rgb(139, 131, 152);
  }  
`;
