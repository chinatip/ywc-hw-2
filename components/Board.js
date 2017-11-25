import React, { Component } from 'react';
import styled from 'styled-components';
import filter from 'lodash/filter';

import ProfilesTable from './ProfilesTable';
import { TABS, TYPES, TITLE_TYPES, COLOR_FADE_TYPES, imgSource } from './const';

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
  
  render() { 
    const { type } = this.state;
    const { searchData } = this.props;
    return (
      <BoardContainer>
        <BoardInnerContainer>
          {this.renderMenuType()}
          <Space />
        </BoardInnerContainer>
        <TableSpace type={type}/>
        <ProfilesTable data={searchData[type]} color={COLOR_FADE_TYPES[type]} />
      </BoardContainer>
    );
  }
} 

export default Board;