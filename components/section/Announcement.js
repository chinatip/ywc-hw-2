import React, { Component } from 'react';
import styled from 'styled-components'

const textColor = '#66fcf1';
const backgroundColor = '#202832';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  color: white;
  background: ${backgroundColor};
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 25%;
  padding: 1rem;
`;

const Logo = styled.div`
  width: 16rem;
  margin-bottom: 2.5rem;
  
  img {
    width: 100%;
    height: auto;
  }
`;

const Input = styled.input`
  width: 15rem;
  height: 1.5rem;
  border-radius: 0.15rem;
  margin-bottom: 2rem;
`;

const Button = styled.div`
  color: black;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
`;  

const BoardContainer = styled.div`
  display: flex;
  background: white;
  margin: 2rem 2rem 0 0;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  flex-basis: 75%;
`;

class Announcement extends Component {
  render() { 
    return (
      <Container>
        <MenuContainer>
          <Logo>
            <img src='/static/ywc_logo.png' />
          </Logo>
          <Input />
          <Button>Search</Button>
        </MenuContainer>
        <BoardContainer>

        </BoardContainer>
      </Container>
    );
  }
} 

export default Announcement;