import React, { Component } from 'react';
import styled, { injectGlobal, css } from 'styled-components'

import { Welcome, Announcement } from '../components/section';
import { media, mediaExceed } from '../utils/media-style';

const GlobalStyles = ({ theme }) => {
  injectGlobal `
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #202832;
    }

    ${media.medium`html { font-size: 13px; }`}
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