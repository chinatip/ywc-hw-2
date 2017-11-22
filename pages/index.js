import React, { Component } from 'react';
import styled, { injectGlobal, css } from 'styled-components'

class Index extends Component {
  render() { 
    return (
      <div>
        <p>YWC</p>
      </div>
    );
  }
} 

export default Index;

const GlobalStyles = ({theme}) => {
  injectGlobal `
    body, html {
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
  `;

  return null;
};