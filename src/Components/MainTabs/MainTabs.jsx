/* eslint-disable react/static-property-placement */
/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Tabs, Input, Spin, Alert } from 'antd';
import PropTypes from 'prop-types';

import CardList from '../CardList';
import './MainTabs.css';
import Footer from '../Footer';

export default class MainTabs extends Component {
  static defaultProps = {
    getInputValue: () => {},
    getRateMovieValues: () => {},
    getPage: () => {},
    loading: false,
    error: false,
    totalPages: 1,
    newPage: 1,
  };

  static propTypes = {
    getInputValue: PropTypes.func,
    getRateMovieValues: PropTypes.func,
    getPage: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    totalPages: PropTypes.number,
    newPage: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      ratedPage: 1,
    };
  }

  getPage = (page) => {
    this.setState({ ratedPage: page });
  };

  render() {
    const { getInputValue, movieData, ratedMovies, loading, error, getRateMovieValues, totalPages, getPage, newPage } =
      this.props;
    const { ratedPage } = this.state;
    let firstIdx = 0;
    let secondIdx = 20;
    if (ratedPage > 1) {
      firstIdx = ratedPage * 20 - 20;
      secondIdx = ratedPage * 20;
    }

    const loader = loading ? <Spin tip="Loading" size="large" /> : null;
    const content = !loading ? <CardList getRateMovieValues={getRateMovieValues} movieData={movieData} /> : null;
    const err =
      error || (movieData.length === 0 && !loading) ? (
        <Alert message="Movie not found" type="warning" showIcon />
      ) : null;

    return (
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
            children: (
              <>
                <Input onInput={getInputValue} placeholder="Type to search" />
                <section className="main">
                  {loader} {content} {err}
                </section>
                <Footer totalPages={totalPages} getPage={getPage} newPage={newPage} />
              </>
            ),
          },
          {
            label: 'Rated',
            key: '2',
            children: (
              <>
                <section className="main">
                  <CardList movieData={ratedMovies.slice(firstIdx, secondIdx)} />
                </section>
                <Footer totalPages={ratedMovies.length} getPage={this.getPage} newPage={ratedPage} />
              </>
            ),
          },
        ]}
      />
    );
  }
}
