import React, { Component } from 'react';
import styled from 'styled-components';
import filter from 'lodash/filter';
import { Table, Popover } from 'antd';

import { TABS, TYPES, TITLE_TYPES, COLOR_TYPES, COLOR_FADE_TYPES, imgSource } from './const';

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1rem;
  margin: 2rem 2rem 0 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  flex-basis: 75%;
  color: grey;
`;
const BoardInnerContainer = styled.div`
  display: flex;
`;

const BoardTypeWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
`;
const TypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  cursor: pointer;
  background: white;
  ${props => props.select? `background: ${COLOR_FADE_TYPES[props.type]}`: ''};

  img {
    width: 100%;
    height: auto;
  }

  div {
    text-align: center;
  }
`;

const Space = styled.div`
  flex: 1;
`;

const TableSpace = styled.div`
  background: ${props => COLOR_FADE_TYPES[props.type]};
  height: 1rem;
`;

const TableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-top: 0;
  background: ${props => COLOR_FADE_TYPES[props.type]};
`;
const TableWrapper = styled.div`
  background: white;
`;

const PopoverContainer = styled.div`
  display: flex;
`;
const Image = styled.div`
  width: 2rem;
  height: 2rem;
  background: grey;
  margin-right: 0.5rem;
`; 
const Title = styled.span`

`; 

class Board extends Component {
  constructor(props) {
    super();

    this.state = {
      type: TABS[0],
    };
  }
  
  handleSelectType = (type) => () => {
    this.setState({ type });
  }

  renderMenuType() {
    const { type } = this.state;

    return (
      <BoardTypeWrapper>
        { TABS.map((t) => {
            return (
              <TypeWrapper select={type === t} type={type} onClick={this.handleSelectType(t)}>
                <img src={imgSource(t)} />
                <div>{TITLE_TYPES[t]}</div>
              </TypeWrapper>
            );
          })
        }
      </BoardTypeWrapper>
    );
  }

  renderProfilePopover(id, record) {
    const { firstName, lastName, interviewRef } = record;
    const content = (
      <PopoverContainer>
        <Image></Image>
        <Title>{`${firstName} ${lastName}`}</Title>
      </PopoverContainer>
    );

    return (
      <Popover content={content} placement="bottom" placement="topRight" trigger="hover">
        <div style={{ cursor: 'pointer' }}>{id}</div>
      </Popover>
    );
  }

  renderProfilesTable() {
    const { type } = this.state;
    const { searchText, searchData, dataByType } = this.props;

    const columns = [,{
      title: 'ID',
      dataIndex: 'interviewRef',
      sorter: (a, b) => a.length - b.length,
      render: (id, record) => {
        return this.renderProfilePopover(id, record);
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
      <TableContainer type={type}>
        <TableWrapper>
          <Table 
          size='middle' 
          pagination={{ pageSize: 80 }} 
          columns={columns} 
          dataSource={searchData[type]} 
          onRowMouseEnter={this.handleRowMouseEnter}/>
        </TableWrapper>
      </TableContainer>
    );
  }
  
  render() { 
    return (
      <BoardContainer>
        <BoardInnerContainer>
          {this.renderMenuType()}
          <Space />
        </BoardInnerContainer>
        <TableSpace type={this.state.type}/>
        {this.renderProfilesTable()}
      </BoardContainer>
    );
  }
} 

export default Board;