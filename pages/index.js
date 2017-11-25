import React, { Component } from 'react';
import styled, { injectGlobal, css } from 'styled-components'

import { Welcome, Announcement } from '../components';
import { media, mediaExceed } from '../utils/media-style';
// import Welcome from '../components/section/Welcome';
// import Announcement from '../components/section/Announcement';

class Index extends Component {
  render() { 
    return (
      <Container>
        <GlobalStyles />
        <Welcome />
        <Announcement />
      </Container>
    );
  }
} 

export default Index;

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }

    ${mediaExceed.super`html { font-size: 1vw; }`}
    ${media.super`html { font-size: 17px; }`}
    ${media.giant`html { font-size: 15px; }`}
    ${media.big`html { font-size: 13px; }`}
    ${media.small`html { font-size: 13px; }`}
    ${media.tablet`html { font-size: 13px; }`}
    ${media.mobile`html { font-size: 12px; }`}
    ${media.smallMobile`html { font-size: 11px; }`}
  `;

  return null;
};

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;