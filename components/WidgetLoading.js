import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class WidgetLoading extends Component {
  render() {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  }
}

export default WidgetLoading;