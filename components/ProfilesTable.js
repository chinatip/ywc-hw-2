import React, { Component } from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { Table, Popover, Modal, Dropdown, Menu, Button, Icon } from 'antd';

import { TYPES, dataFormat, FBimgSource, FBProfile } from './const';
import { FB_ID_BY_MAJOR } from './const-fb-id'

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
  background: ${props => props.color};
`;
const TableWrapper = styled.div`
  background: white;
`;

const PopoverContainer = styled.div`
  display: flex;
`;
const Image = styled.div`
  width: ${props => props.small? 2: 4}rem;
  height: ${props => props.small? 2: 4}rem;
  background: grey;
  margin-right: 0.5rem;
  img {
    width: 100%;
    height: auto;
  }
`; 
const Title = styled.span`

`; 

const DropdownContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;

  .ant-btn {
    padding: 0 0.3rem;
  }
  .ant-dropdown-trigger {
    width: 5rem;    
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

class ProfilesTable extends Component {
  constructor(props) {
    super();
    
    this.state = {
      visible: false,
      profile: null,
      sortKey: Object.keys(dataFormat)[0],
      reverse: false
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

  renderModal() {
    const { profile, visible } = this.state;
    if(!profile) return <div />;

    const { firstName, lastName, major, interviewRef } = profile;
    const fbId = FB_ID_BY_MAJOR[major]? FB_ID_BY_MAJOR[major][interviewRef]: null;

    return (
      <Modal
        title="Basic Modal"
        visible={this.state.visible}
        okText="OK"
        cancelText="Cancel"
        onOk={this.handleClose}
        onCancel={this.handleClose}
      >
        <PopoverContainer>
          <Image>
            { fbId && <img src={FBimgSource(fbId)} onClick={this.handleClick(fbId)} /> }
          </Image>
          <Title>{`${firstName} ${lastName}`}</Title>
        </PopoverContainer>
      </Modal>
    )
  }

  renderProfilePopover(id, profile) {
    const { firstName, lastName, major, interviewRef } = profile;
    const fbId = FB_ID_BY_MAJOR[major]? FB_ID_BY_MAJOR[major][interviewRef]: null;
    const content = (
      <PopoverContainer>
        <Image small>
          { fbId && <img src={FBimgSource(fbId)} onClick={this.handleClick(fbId)}/> }
        </Image>
        <Title>{`${firstName} ${lastName}`}</Title>
      </PopoverContainer>
    );

    return (
      <Popover content={content} placement="bottom" placement="topRight" trigger="hover">
        <div style={{ cursor: 'pointer' }}>{id}</div>
      </Popover>
    );
  }

  render() {
    const { sortKey, reverse } = this.state;
    const { data, color } = this.props;

    const columns = [,{
      title: 'ID',
      dataIndex: 'interviewRef',
      render: (id, profile) => {
        return this.renderProfilePopover(id, profile);
      },
    },{
      title: 'Firstname',
      dataIndex: 'firstName',
    }, {
      title: 'Lastname',
      dataIndex: 'lastName',
    },{
      title: 'Major',
      dataIndex: 'major',
    }];


    const menu = (
      <Menu>
        { map(dataFormat, (format, key) => {
            return (<Menu.Item><ItemContainer onClick={this.handleSort(key)}>{format}</ItemContainer></Menu.Item>);
          })
        }
      </Menu>
    );

    const iconType = reverse? "up": "down";
    const sortData = reverse? sortBy(data, [sortKey]).reverse(): sortBy(data, [sortKey]);
    return (
      <TableContainer color={color}>
        <RollbackDropdown innerRef={(r) => { this.dropdownContainer = r }} />
        <DropdownContainer>
          <Dropdown overlay={menu} placement="bottomCenter" getPopupContainer={this.handleDropDownContainer} >
            <Button>{dataFormat[sortKey]}</Button>
          </Dropdown>
          <Button onClick={this.handleReverse}>
            <Icon type={iconType} />
          </Button>
        </DropdownContainer>
        <TableWrapper>
          <Table 
            size='middle' 
            pagination={{ pageSize: 80 }} 
            scroll={{ y: 600 }}
            columns={columns} 
            dataSource={sortData} 
            onRowClick={this.handleOpen}/>
        </TableWrapper>
        { this.renderModal() }
      </TableContainer>
    );
  }
} 

export default ProfilesTable;