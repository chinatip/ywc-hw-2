import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  font-size: 3rem;

  .anticon-reload {
    &:hover {
      opacity: 0.8;
    }
  }
`;

class WidgetError extends Component {
  handleReload = () => {
    const { onReload } = this.props;
    onReload();
  }

  render() {
    return (
      <Container>
        <Icon type="reload" onClick={this.handleReload} />
      </Container>
    );
  }
}

export default WidgetError;