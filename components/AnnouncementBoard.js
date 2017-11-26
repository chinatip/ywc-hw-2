import React, { Component } from 'react';
import styled from 'styled-components';
import filter from 'lodash/filter';

import AnnouncementTable from './AnnouncementTable';
import { TABS, TITLE_MAJORS, COLOR_FADE_MAJORS, imgSource, media } from './const';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1rem;
  margin: 2rem 2rem 0 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  flex-basis: 75%;
  color: grey;
  ${ media.tablet`
    margin: 0 1rem;
  `}
`;
const BoardInnerContainer = styled.div`
  display: flex;
  min-height: 6.5rem;
    
`;

const BoardMajorWrapper = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
`;
const MajorWrapper = styled.div`
  display: flex;
  max-width: 7rem;
  max-height: 7rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  cursor: pointer;
  background: white;
  font-size: 0.75rem;
  ${props => props.select? `background: ${COLOR_FADE_MAJORS[props.major]}`: ''};

  div {
    text-align: center;
  }

  ${ media.tablet`
    max-width: 6rem;
  `}

  ${ media.mobile`
    font-size: 0.8rem;
  `}
`;
const MajorImage = styled.div`
  width: 7rem;
  height: 5.5rem;
  img {
    width: 100%;
    height: auto;
  }
  ${ media.tablet`
    max-width: 6rem;
  `}
  ${ media.mobile`
    max-width: 5rem;
  `}
`;

const TableContainer = styled.div`
  border-radius: 0.5rem;
  border-top-left-radius: ${ props => props.major !== 'all'? '0.5rem': 0};
  background: linear-gradient(to bottom, ${props => COLOR_FADE_MAJORS[props.major]} 30%, white 100%);
  padding: 1rem;
`;

class AnnouncementBoard extends Component {
  constructor(props) {
    super();

    this.state = {
      major: TABS[0],
    };
  }
  
  handleSelectType = (major) => () => {
    this.setState({ major });
  }

  renderMenuType() {
    const { major } = this.state;

    return (
      <BoardMajorWrapper>
        { TABS.map((t) => {
            return (
              <MajorWrapper select={major === t} major={major} onClick={this.handleSelectType(t)}>
                <MajorImage>
                  <img src={imgSource(t)} />
                </MajorImage>
                <div>{TITLE_MAJORS[t]}</div>
              </MajorWrapper>
            );
          })
        }
      </BoardMajorWrapper>
    );
  }
  
  render() { 
    const { major } = this.state;
    const { searchData } = this.props;

    return (
      <Container>
        <BoardInnerContainer>
          {this.renderMenuType()}
        </BoardInnerContainer>
        <TableContainer major={major}>
          <AnnouncementTable data={searchData[major]} />
        </TableContainer>
      </Container>
    );
  }
} 

export default AnnouncementBoard;