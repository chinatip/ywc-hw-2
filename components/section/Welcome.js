import React, { Component } from 'react';
import styled from 'styled-components';

import { imgSource, font } from '../const';

const Container = styled.div`
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${font};
`;
const LogoContainer = styled.div`
  padding: 3rem;
  margin-top: -20vh;
  max-width: 25rem;
  max-height: 25rem;

  img {
    width: 100%;
    height: auto;
  }
`;  
const Title = styled.span`
  font-size: 3rem;
  font-weight: 700;
`; 
const Subtitle = styled.span`
  font-size: 2rem;
`;

class Welcome extends Component {
  render() { 
    return (
      <Container>
        <LogoContainer>
          <img src={imgSource('logo')} />
        </LogoContainer>
        <Title>SEMI_FINAL ROUND</Title>
        <Subtitle>ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์</Subtitle>
      </Container>
    );
  }
} 

export default Welcome;