import React, { Component } from 'react';

import { PeerChat } from '../../components';
import * as ifvisible from 'ifvisible.js';

import { connect } from 'react-redux';
import { socketEmit } from '../../../redux/actions/creators/socket';

@connect(null, {
  socketEmit
})
export default class SessionChat extends Component {
  constructor(props) {
    super(props);
    // set up ifvisible.js time detection
    ifvisible.setIdleDuration(300);
    ifvisible.on('idle', () => {
      console.log("Sleeping...")
      this.props.socketEmit('updateVolunteerTime', {
        action: 'stop'
      });
    });
    ifvisible.on('wakeup', () => {
      console.log("Waking up...")
      this.props.socketEmit('updateVolunteerTime', {action: 'wakeup'});
    });
    console.log("Waking up...")
    this.props.socketEmit('updateVolunteerTime', {
      action: 'wakeup'
    });
  }

  render() {
    return (
      <PeerChat
        {...this.props}
        mode='guru'
      />
    );
  }
}