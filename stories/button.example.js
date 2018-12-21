import React from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.css';

export default <div class="wrap">
<h2>一般样式</h2>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
<h2>一般样式</h2>
      <Button type="primary" shape="circle" icon="search" />
      <Button type="primary" icon="search">Search</Button>
      <Button shape="circle" icon="search" />
      <Button icon="search">Search</Button>
<h2>一般样式</h2>
      <Button shape="circle" icon="search" />
      <Button icon="search">Search</Button>
      <Button type="dashed" shape="circle" icon="search" />
      <Button type="dashed" icon="search">Search</Button>
</div>;