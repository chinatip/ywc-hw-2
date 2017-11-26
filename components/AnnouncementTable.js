import React, { Component } from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { Dropdown, Menu, Button, Icon } from 'antd';

import ProfileModal from './ProfileModal';
import ProfilesTable from './ProfilesTable';

import { FB_ID_BY_MAJOR } from './const-fb-id';
import { MAJORS, dataFormat, FBimgSource, FBProfile } from './const';

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const DropdownContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;

  .ant-btn {
    padding: 0 0.3rem;
  }
  .ant-dropdown-trigger {
    width: 7rem;    
  }
`;  
const RollbackDropdown = styled.div`
  .ant-dropdown-menu-item {
    padding: 0;
  }
`; 
const ItemContainer = styled.div`
  padding: 0.5rem;
`;

class AnnouncementTable extends Component {
  constructor(props) {
    super();
    
    this.state = {
      visible: false,
      profile: null,
      reverse: false,
      sortKey: Object.keys(dataFormat)[0],
    }
  }

  handleSort = (sortKey) => () => {
    this.setState({ sortKey });
  }

  handleReverse = () => {
    const { reverse } = this.state;

    this.setState({ reverse: !reverse });
  }

  handleOpen = (profile) => {
    this.setState({
      profile: profile,
      visible: true
    });
  }

  handleClose = () => {
    this.setState({
      profile: null,
      visible: false
    });
  }

  handleClick = (fbId) => () => {
    window.open(FBProfile(fbId), '_blank');
  }

  handleDropDownContainer = () => {
    return this.dropdownContainer
  }

  renderMenu() {
    return (
      <Menu>
        { map(dataFormat, (format, key) => {
            return (
              <Menu.Item>
                <ItemContainer onClick={this.handleSort(key)}>{format}</ItemContainer>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }

  render() {
    const { sortKey, reverse, profile, visible } = this.state;
    const { data } = this.props;

    const iconType = reverse? "up": "down";
    const sortData = reverse? sortBy(data, [sortKey]).reverse(): sortBy(data, [sortKey]);
    
    return (
      <Container>
        <DropdownContainer>
          <RollbackDropdown innerRef={(r) => { this.dropdownContainer = r }} />
          <Dropdown overlay={this.renderMenu()} placement="bottomCenter" getPopupContainer={this.handleDropDownContainer} >
            <Button>{dataFormat[sortKey]}</Button>
          </Dropdown>
          <Button onClick={this.handleReverse}>
            <Icon type={iconType} />
          </Button>
        </DropdownContainer>
        <ProfilesTable data={sortData} onRowClick={this.handleOpen} onClick={this.handleClick} />
        <ProfileModal profile={profile} visible={visible} onClose={this.handleClose} onClick={this.handleClick} />
      </Container>
    );
  }
} 

export default AnnouncementTable;