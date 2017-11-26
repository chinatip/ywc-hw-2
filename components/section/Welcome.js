import React, { Component } from 'react';
import styled, { css, keyframes } from 'styled-components';
import $ from 'jquery';
import anime from 'animejs';


import { imgSource, font, textColor, media } from '../const';

const Container = styled.div`
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${font};
  position: relative;
  overflow: hidden;
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
  color: ${textColor};  
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

const gradientColorBlue = 'linear-gradient(322deg,#3B414E 48%, rgba(102, 252, 241, 0.38) 73%,#54d8ff 80%,#fffcfd 100%)';
const gradientColorWhite = 'linear-gradient(322deg,#fefeff 48%,rgba(102,252,241,0.38) 73%,#655d8a 80%,#c3718c 100%)';
const cssBubble = css`
  position: absolute;
  border-radius: 50%;
  opacity: 0.74;
  ${media.tablet`display: none;`}
`;

const BubbleBlue1 = styled.div`
  ${cssBubble}
  top: 10%;
  right: -10%;
  width: 22rem;
  height: 22rem;
  background: ${gradientColorBlue};
`;
const BubbleBlue2 = styled.div`
  ${cssBubble}
  top: 70%;
  left: 15%;
  width: 10rem;
  height: 10rem;
  background: ${gradientColorBlue};
`;
const BubbleBlue3 = styled.div`
  ${cssBubble}
  top: 40%;
  left: -15%;
  width: 30rem;
  height: 30rem;
  background: ${gradientColorBlue};
`;

const BubbleWhite1 = styled.div`
  ${cssBubble}
  top: 5%;
  right: 5%;
  width: 5rem;
  height: 5rem;
  background: ${gradientColorWhite};
`;
const BubbleWhite2 = styled.div`
  ${cssBubble}
  top: 10%;
  left: 15%;
  width: 3rem;
  height: 3rem;
  background: ${gradientColorWhite};
`;
const BubbleWhite3 = styled.div`
  ${cssBubble}
  bottom: 10%;
  left: 10%;
  width: 4rem;
  height: 4rem;
  background: ${gradientColorWhite};
`;

class Welcome extends Component {
  componentDidMount() {
    try {
      this.animate();
    } catch (err) {
      console.error(err);
    }
  }

  animate() {
    const animateBubbleBlue1 = anime({
      targets: this._bbBlue1,
      translateX: [+50, 0],
    })

    const animateBubbleBlue2 = anime({
      targets: this._bbBlue2,
      translateX: [+60, 0],
    });

    const animateBubbleBlue3 = anime({
      targets: this._bbBlue3,
      translateX: [-50, 0],
    });

    this._setupParallaxEffect();
  }
  
  scroll = () => {
    $('html, body').animate({
      scrollTop: $("#announcement-section").offset().top
    }, 500);
  }

  _setupParallaxEffect() {    
    this._bbBoundingRectBlue1 = this._bbBlue1.getBoundingClientRect();
    this._bbBoundingRectBlue2 = this._bbBlue2.getBoundingClientRect();
    this._bbBoundingRectBlue3 = this._bbBlue3.getBoundingClientRect();
    this._bbBoundingRectWhite1 = this._bbWhite1.getBoundingClientRect();
    this._bbBoundingRectWhite2 = this._bbWhite2.getBoundingClientRect();
    this._bbBoundingRectWhite3 = this._bbWhite3.getBoundingClientRect();
    this._setup = true;
  }

  mouseParallax( obj, initBoundingRecct, mouseX, mouseY, speed ) {
    const { left, top, width, height } = initBoundingRecct;
    const parentObj = obj.parentNode;
    const { width: containerWidth, height: containerHeight } = parentObj.getBoundingClientRect();
    obj.style.left = left - parseInt(((mouseX - (width / 2 + left)) / containerWidth) * speed) + 'px';
    obj.style.top = top - parseInt(((mouseY - (height / 2 + top)) / containerHeight) * speed) + 'px';
  }

  _onMouseMove = (event) => {
    if (!this._setup) {
      return;
    }
    const parallaxBox = document.body;

    const x = event.clientX - parallaxBox.offsetLeft;
    const y = event.clientY - parallaxBox.offsetTop;

    this.mouseParallax(this._bbBlue1, this._bbBoundingRectBlue1, x, y, 30);
    this.mouseParallax(this._bbBlue2, this._bbBoundingRectBlue2, x, y, 10);
    this.mouseParallax(this._bbBlue3, this._bbBoundingRectBlue3, x, y, 15);

    this.mouseParallax(this._bbWhite1, this._bbBoundingRectWhite1, x, y, 10);
    this.mouseParallax(this._bbWhite2, this._bbBoundingRectWhite2, x, y, 25);
    this.mouseParallax(this._bbWhite3, this._bbBoundingRectWhite3, x, y, 15);
  }

  render() { 
    return (
      <Container onMouseMove={this._onMouseMove}>
        <LogoContainer>
          <img src={imgSource('logo')} />
        </LogoContainer>
        <Title>SEMI_FINAL ROUND</Title>
        <Subtitle>ประกาศผู้มีสิทธิ์เข้าสัมภาษณ์</Subtitle>
        <Scroll onClick={this.scroll}></Scroll>
        <BubbleBlue1 
          innerRef={ref => { this._bbBlue1 = ref }}>
        </BubbleBlue1>
        <BubbleBlue2 
          innerRef={ref => { this._bbBlue2 = ref }}>
        </BubbleBlue2>
        <BubbleBlue3
          innerRef={ref => { this._bbBlue3 = ref }}>
        </BubbleBlue3>
        <BubbleWhite1
          innerRef={ref => { this._bbWhite1 = ref }}>
        </BubbleWhite1>
        <BubbleWhite2
          innerRef={ref => { this._bbWhite2 = ref }}>
        </BubbleWhite2>
        <BubbleWhite3
          innerRef={ref => { this._bbWhite3 = ref }}>
        </BubbleWhite3>
      </Container>
    );
  }
} 

export default Welcome;