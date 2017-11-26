import React, { Component } from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { Popover, Dropdown, Menu, Button, Icon } from 'antd';

import { MAJORS, dataFormat, FBimgSource, FBProfile } from './const';
import { FB_ID_BY_MAJOR } from './const-fb-id';
import ProfileModal from './ProfileModal';

const Container = styled.div`
  display: flex;
`;
const Image = styled.div`
  width: ${props => props.small? 2: 4}rem;
  height: ${props => props.small? 2: 4}rem;
  background: grey;
  margin-right: 0.5rem;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
  }
`; 

class ProfilePopover extends Component {
  renderContent() {
    const { profile, onClick } = this.props;
    const { firstName, lastName, major, interviewRef } = profile;
    const fbId = FB_ID_BY_MAJOR[major]? FB_ID_BY_MAJOR[major][interviewRef]: null;

    return (
      <Container>
        <Image small>
          { fbId && <img src={FBimgSource(fbId)} onClick={onClick(fbId)}/> }
        </Image>
        <span>{`${firstName} ${lastName}`}</span>
      </Container>
    );
  }

  render() {
    const { interviewRef } = this.props.profile;

    return (
      <Popover content={this.renderContent()} placement="bottom" placement="topRight" trigger="hover">
        <div style={{ cursor: 'pointer' }}>{interviewRef}</div>
      </Popover>
    );
  }
} 

export default ProfilePopover;