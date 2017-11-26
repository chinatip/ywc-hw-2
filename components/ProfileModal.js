import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';

import { FBimgSource, FBProfile } from './const';
import { FB_ID_BY_MAJOR } from './const-fb-id'

const Container = styled.div`
  display: flex;
  align-items: center;
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

class ProfileModal extends Component {
  render() {
    const { profile, visible, onClick, onClose } = this.props;

    if(!profile) {
      return <div />;
    }
    
    const { firstName, lastName, major, interviewRef } = profile;
    const fbId = FB_ID_BY_MAJOR[major]? FB_ID_BY_MAJOR[major][interviewRef]: null;
    

    return (
      <Modal
        visible={visible}
        okText="OK"
        cancelText="Cancel"
        onOk={onClose}
        onCancel={onClose}
      >
        <Container>
          <Image>
            { fbId && <img src={FBimgSource(fbId)} onClick={onClick(fbId)} /> }
          </Image>
          <span>{`${firstName} ${lastName}`}</span>
        </Container>
      </Modal>
    );
  }
} 

export default ProfileModal;