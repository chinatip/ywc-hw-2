import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import $ from 'jquery';

import { imgSource, font } from '../const';

const Container = styled.div`
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${font};
  position: relative;
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

const animation = keyframes`
  0% {
    transform: rotate(-45deg) translate(0, 0);
  }
  20% {
    transform: rotate(-45deg) translate(-10px, 10px);
  }
  40% {
    transform: rotate(-45deg) translate(0, 0);
  }
`;

const Scroll = styled.span`
  width: 2rem;
  height: 2rem;
  position: absolute;
  bottom: 7rem;
  cursor: pointer;
  transform: rotate(-45deg);
  border-left: 0.2rem solid #fff;
  border-bottom: 0.2rem solid #fff;
  animation: ${animation} 2s infinite;
`;

class Welcome extends Component {
  scroll = () => {
    $('html, body').animate({
      scrollTop: $("#announcement-section").offset().top
    }, 500);
  }

  render() { 
    return (
      <Container>
        <LogoContainer>
          <img src={imgSource('logo')} />
        </LogoContainer>
        <Title>SEMI_FINAL ROUND</Title>
        <Subtitle>ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์</Subtitle>
        <Scroll onClick={this.scroll}></Scroll>
      </Container>
    );
  }
} 

export default Welcome;