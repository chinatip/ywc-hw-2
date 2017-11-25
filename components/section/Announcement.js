import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

import Board from '../Board';
import { withAnnouncementData } from '../hoc';
import { imgSource, backgroundColor } from '../const';

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

class Announcement extends Component {
  constructor(props) {
    super();

    this.state = {
      searchText: ''
    };
  }

  componentWillUpdate (nextProps, nextState) {
    if(nextState.searchText !== this.state.searchText) {
      this.updateSearchText(nextProps, nextState);
    }
  }

  updateSearchText({ onSearch }, { searchText }) {
    if (onSearch) {
      onSearch(searchText);
    }
  }

  handleSearch = (e) => {
    this.setState({ searchText: e.target.value });
  }

  emitEmpty = () => {
    this.searchInput.focus();
    
    this.setState({ searchText: '' });
  }

  render() { 
    const { searchText } = this.state;
    const { loading, error } = this.props;

    const suffix = searchText.length > 0? <Icon type="close-circle" onClick={this.emitEmpty} style={{ cursor: 'pointer' }}/> : null;

    if (loading) {
      return 'loading...';
    } else if (error) {
      return 'error';
    }
    return (
      <Container>
        <MenuContainer>
          <Logo>
            <img src={imgSource('logo')} />
          </Logo>
          <Input
            placeholder="Search"
            suffix={suffix}
            value={searchText}
            style={{ width: 200 }}
            onChange={this.handleSearch}
            ref={(r) => { this.searchInput = r }}
          />
        </MenuContainer>
        <Board {...this.props} />
      </Container>
    );
  }
} 

export default withAnnouncementData(Announcement);