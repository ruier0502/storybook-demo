import React from 'react';
import { storiesOf } from '@storybook/react';
// import 'antd/dist/antd.css';

import { Button } from 'antd';

storiesOf('示例', module)
  .add('with text', () => <Button>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
