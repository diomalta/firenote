import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  height: 70px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  background: #282A36;
  padding: 30px;
  border-bottom: 1px solid rgb(59, 54, 73);
`;

export const Title = styled.h1`
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  /* margin-left: 20px; */
  font-weight: bold;
  font-size: 24px;
  color: #fff;
`;


export const Logout = styled.a`
  display: block;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  margin-left: 20px;
  font-size: 14px;
  color: rgb(139,131,152);
  text-decoration: none;

  i {
    margin-right: 7px;
  }  
`;