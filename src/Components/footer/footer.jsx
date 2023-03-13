/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Pagination } from 'antd';

import './footer.css';

export default class Footer extends Component {
  render() {
    const { getPage, totalPages, newPage } = this.props;

    return (
      <footer className="pagination">
        <Pagination onChange={getPage} current={newPage} total={totalPages} />
      </footer>
    );
  }
}
