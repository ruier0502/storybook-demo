import { storiesOf } from '@storybook/react';
import test from './button.test';
import { specs} from 'storybook-addon-specifications';
import demo from './button.example';


storiesOf('Button', module)
  .add('基本用法', () => {
            specs(() => test)
            return demo;
      }, {
            info: {
                  inline: true
            }
  });
