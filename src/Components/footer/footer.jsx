/* eslint-disable class-methods-use-this */
/* eslint-disable react/static-property-placement */
import { Component } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

import './footer.css';

export default class Footer extends Component {
  static defaultProps = {
    getPage: () => {},
    totalPages: 1,
    newPage: 1,
  };

  static propTypes = {
    getPage: PropTypes.func,
    totalPages: PropTypes.number,
    newPage: PropTypes.number,
  };

  render() {
    const { getPage, totalPages, newPage } = this.props;

    return (
      <footer className="pagination">
        <Pagination
          showSizeChanger=""
          onChange={getPage}
          current={newPage}
          total={totalPages}
          defaultPageSize="20"
          hideOnSinglePage
        />
      </footer>
    );
  }
}
