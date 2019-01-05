import React from 'react';
import { Header, Segment, Image, Divider } from 'semantic-ui-react';

const NoMatch = () => (
    <Segment textAlign='center'>
      <Header as='h1' textAlign='center'>You've been Rickrolled!</Header>
      <Image centered src='https://media.giphy.com/media/kFgzrTt798d2w/giphy.gif' size='large' />
      <Divider/>
      <Image centered src='https://media.giphy.com/media/lW9XPLjNXyDDO/giphy.gif' size='large' />
    </Segment>
);

export default NoMatch;