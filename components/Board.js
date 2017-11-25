import React, { Component } from 'react';
import styled from 'styled-components';
import filter from 'lodash/filter';

import { TYPES, TITLE_TYPES, imgSource } from './const';

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
  margin-bottom: 1rem;
`;

const BoardTypeWrapper = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  flex: 1;
`;
const TypeWrapper = styled.div`
  text-align: center;
  margin-right: 0.4rem;
  padding: 0.1rem;
  border: 1px solid grey;
  border-radius: 0.2rem;
  cursor: pointer;
  ${props => props.select? 'border: 2px solid purple;': ''};

  img {
    width: 100%;
    height: auto;
  }

  div {
    text-align: center;
  }
`;

const BoardHomeWorkWrapper = styled.div`
  flex: 1;
  border: 1px solid grey;
  border-radius: 0.3rem;
  height: 14rem;
`;

const BoardProfilesWrapper = styled.div`
  flex: 1;
  display: flex;
  overflow-y: auto;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Profile = styled.div`
  border: 1px solid;
  border-radius: 0.2rem;
  padding: 0.2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  ${props => props.isMatch? 'background: red': ''};
`;

class Board extends Component {
  constructor(props) {
    super();

    this.state = {
      type: TYPES[0],
    };
  }

  handleSelectType = (type) => () => {
    this.setState({ type });
  }

  renderMenuType() {
    const { type } = this.state;

    return (
      <BoardTypeWrapper>
        { TYPES.map((t) => {
            return (
              <TypeWrapper select={type === t} onClick={this.handleSelectType(t)}>
                <img src={imgSource(t)} />
                <div>{`Web ${TITLE_TYPES[t]}`}</div>
              </TypeWrapper>
            );
          })
        }
      </BoardTypeWrapper>
    );
  }

  renderColumnProfiles(data) {
    const { type } = this.state;
    const { searchData } = this.props;

    return (
      data.map((d, index) => {
          const { interviewRef, firstName, lastName, search } = d;
          const isMatch = filter(searchData[type], ((s) => interviewRef === s.interviewRef)).length > 0;

          return (
            <Profile key={index + interviewRef} isMatch={search}>
              <span>{`${interviewRef} ${firstName} ${lastName}`}</span>
            </Profile>
          );
        })
      );
  }

  renderProfiles() {
    const { type } = this.state;
    const { searchText, searchData, dataByType } = this.props;
    const data = (searchData[type] || []).concat(dataByType[type]);

    const data1 = data.filter((d, index) => (index < data.length/2) );
    const data2 = data.filter((d, index) => (index >= data.length/2) );

    return (
      <BoardProfilesWrapper>
        <Column>
          {this.renderColumnProfiles(data1)}
        </Column>
        <Column>
          {this.renderColumnProfiles(data2)}
        </Column>
      </BoardProfilesWrapper>
    );
  }
  
  render() { 
    return (
      <BoardContainer>
        <BoardInnerContainer>
          {this.renderMenuType()}
          <BoardHomeWorkWrapper>

          </BoardHomeWorkWrapper>
        </BoardInnerContainer>
        {this.renderProfiles()}
      </BoardContainer>
    );
  }
} 

export default Board;