import React, { Component } from 'react';
import styled from 'styled-components';

import Board from '../Board';
import { withAnnouncementData } from '../hoc';
import { imgSource, backgroundColor } from '../const';

// import { Input } from 'antd';

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
const Input = styled.input`
  width: 15rem;
  height: 1.5rem;
  border-radius: 0.15rem;
  margin-bottom: 2rem;
  color: black;
`;
const Button = styled.div`
  color: black;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
`;  

class Announcement extends Component {
  handleSearch = (e) => {
    const { onSearch } = this.props;
    const value = e.target.value;

    if (onSearch) {
      onSearch(value);
    }
  }

  render() { 
    const { loading, error } = this.props;

    if (loading) {
      return 'loading...';
    } else if (error) {
      return 'error';
    }
    return (
      <Container>
        <MenuContainer>
        {/* <Input.Search
          placeholder="input search text"
          style={{ width: 200 }}
          onSearch={value => console.log(value)}
        /> */}
          <Logo>
            <img src={imgSource('logo')} />
          </Logo>
          <Input onChange={this.handleSearch}/>
          <Button>Search</Button>
        </MenuContainer>
        <Board {...this.props} />
      </Container>
    );
  }
} 

export default withAnnouncementData(Announcement);