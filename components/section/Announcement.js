import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Icon } from 'antd';

import AnnouncementBoard from '../AnnouncementBoard';
import WidgetLoading from '../WidgetLoading';
import WidgetError from '../WidgetError';
import { withAnnouncementData } from '../hoc';
import { imgSource, backgroundColor, media } from '../const';

const Container = styled.div`
  height: 100vh;
  color: white;
  ${ media.tablet`
    height: auto;
  `}
`;
const InnerContainer = styled.div`
  height: auto;
  min-height: 100%;
  display: flex;
  
  ${ media.tablet`
    flex-direction: column;
  `}
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 25%;
  padding: 1rem;

  ${ media.tablet`
    margin-bottom: 2rem;
  `}
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
    const { loading, error, onReload } = this.props;

    const suffix = searchText.length > 0? <Icon type="close-circle" onClick={this.emitEmpty} style={{ cursor: 'pointer' }}/> : null;

    if (loading) {
      return <WidgetLoading />
    } else if (error) {
      return <WidgetError onReload={onReload}/>;
    }
    return (
      <Container id="announcement-section">
        <InnerContainer>
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
          <AnnouncementBoard {...this.props} />
        </InnerContainer>
      </Container>
    );
  }
} 

export default withAnnouncementData(Announcement);