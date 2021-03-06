import React, { Component } from 'react';

import Route from '../Route';
import Flex from '../Flex';
import RecentChats from './RecentChats';
import ChatScreen from './ChatScreen';

export default class ChatRouter extends Component {
  render() {
    let { match, mode } = this.props;

    return (
      <Flex grow={1}>
        <Flex
          grow={1}
          basis={50}
        >
          <Route
            path={`${match.url}/:sessionId?`}
            render={props => (
              <RecentChats
                {...props}
                mode={mode}
              />
            )}
          />
        </Flex>
        <Flex
          grow={2}
          basis={100}
        >
          <Route
            path={`${match.url}/:sessionId`}
            render={props => (
              <ChatScreen
                {...props}
                mode={mode}
              />
            )}
          />
        </Flex>
      </Flex>
    );
  }
}