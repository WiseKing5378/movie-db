/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Tabs, Input } from 'antd';

export default class Header extends Component {
  render() {
    const { getInputValue } = this.props;
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
              children: <Input onInput={getInputValue} placeholder="Type to search" />,
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
