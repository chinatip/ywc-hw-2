import React, { Component } from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  color: white;
  background: #202832;
`;

class Welcome extends Component {
  render() { 
    return (
      <Container>
        <p>Welcome</p>
      </Container>
    );
  }
} 

export default Welcome;