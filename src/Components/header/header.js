import { Component } from 'react';
import { Tabs, Input } from 'antd';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Tabs
          defaultActiveKey="1"
          style={{
            marginBottom: 32,
          }}
          centered="true"
          items={[
            {
              label: 'Search',
              key: '1',
              children: <Input placeholder="Type to search" />,
            },
            {
              label: 'Rated',
              key: '2',
            },
          ]}
        />
      </header>
    );
  }
}
