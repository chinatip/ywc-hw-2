import React, { Component } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';

import ProfilePopover from './ProfilePopover';

const Container = styled.div`
  background: white;
`;

class ProfilesTable extends Component {
  constructor(props) {
    super();
    
    this.state = {
      columns: this.initColumns(),
    }
  }

  initColumns() {
    return [{
      title: 'ID',
      dataIndex: 'interviewRef',
      render: (id, profile) => {
        return <ProfilePopover profile={profile} onClick={this.handleClick} />;
      },
      width: '10%'
    },{
      title: 'Firstname',
      dataIndex: 'firstName',
      width: '35%'
    }, {
      title: 'Lastname',
      dataIndex: 'lastName',
      width: '35%'
    },{
      title: 'Major',
      dataIndex: 'major',
      width: '20%'
    }];
  }

  handleClick = (fbid) => () => {
    const { onClick } = this.props;

    return onClick(fbid)();
  }

  render() {
    const { columns } = this.state;
    const { data, onRowClick } = this.props;
    
    return (
        <Container>
          <Table 
            size='middle' 
            pagination={{ pageSize: 80 }} 
            scroll={{ y: '65vh' }}
            columns={columns} 
            dataSource={data} 
            onRowClick={onRowClick} />
        </Container>
    );
  }
} 

export default ProfilesTable;