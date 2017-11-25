import React, { Component } from 'react';
import styled from 'styled-components';
import filter from 'lodash/filter';

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

const BoardProfilesWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: ${props => COLOR_FADE_TYPES[props.type]};
`;
const ColumnWrapper = styled.div`
  display: flex;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Profile = styled.div`
  border: 1px solid transparent;
  border-radius: 0.2rem;
  padding: 0.2rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background: white;
  ${props => props.isMatch? `border-color: ${COLOR_TYPES[props.type]}; box-shadow: 0 0 0.5rem 0.1rem ${COLOR_TYPES[props.type]};`: ''};
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
              <TypeWrapper select={type === t} type={type} onClick={this.handleSelectType(t)}>
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
            <Profile key={index + interviewRef} isMatch={search} type={type}>
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
      <BoardProfilesWrapper type={type}>
        <ColumnWrapper>
          <Column>
            {this.renderColumnProfiles(data1)}
          </Column>
          <Column>
            {this.renderColumnProfiles(data2)}
          </Column>
        </ColumnWrapper>
      </BoardProfilesWrapper>
    );
  }
  
  render() { 
    return (
      <BoardContainer>
        <BoardInnerContainer>
          {this.renderMenuType()}
          <Space />
        </BoardInnerContainer>
        {this.renderProfiles()}
      </BoardContainer>
    );
  }
} 

export default Board;