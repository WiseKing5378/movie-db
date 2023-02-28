import { Component } from 'react';
import { Pagination } from 'antd';

import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer className="pagination">
        <Pagination defaultCurrent={1} total={50} />
      </footer>
    );
  }
}
