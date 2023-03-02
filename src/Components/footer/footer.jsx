/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Pagination } from 'antd';

import './footer.css';

export default class Footer extends Component {
  render() {
    const { getPage, totalPages } = this.props;
    return (
      <footer className="pagination">
        <Pagination onChange={getPage} defaultCurrent={1} total={totalPages} />
      </footer>
    );
  }
}
