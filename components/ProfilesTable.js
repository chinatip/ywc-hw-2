import React, { Component } from 'react';
import styled from 'styled-components';
import { Table, Popover, Modal } from 'antd';

import { FBimgSource, FBProfile } from './const';
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

class ProfilesTable extends Component {
  constructor(props) {
    super();
    
    this.state = {
      visible: false,
      profile: null
    }
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
    const { data, color } = this.props;

    const columns = [,{
      title: 'ID',
      dataIndex: 'interviewRef',
      sorter: (a, b) => a.length - b.length,
      render: (id, profile) => {
        return this.renderProfilePopover(id, profile);
      },
    },{
      title: 'Firstname',
      dataIndex: 'firstName',
      sorter: (a, b) => a.length - b.length,
    }, {
      title: 'Lastname',
      dataIndex: 'lastName',
      sorter: (a, b) => a.length - b.length,
    },{
      title: 'Major',
      dataIndex: 'major',
    }];

    return (
      <TableContainer color={color}>
        <TableWrapper>
          <Table 
            size='middle' 
            pagination={{ pageSize: 80 }} 
            columns={columns} 
            dataSource={data} 
            onRowClick={this.handleOpen}/>
        </TableWrapper>
        { this.renderModal() }
      </TableContainer>
    );
  }
} 

export default ProfilesTable;