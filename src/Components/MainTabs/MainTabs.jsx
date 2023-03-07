/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Tabs, Input, Spin, Alert } from 'antd';

import CardList from '../card-list';
import './MainTabs.css';

export default class MainTabs extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 1,
    };
  }

  componentDidUpdate() {}

  render() {
    const { getInputValue, movieData, ratedMovies, loading, error, getRateMovieValues } = this.props;
    const { activeTab } = this.state;

    const loader = loading ? <Spin size="large" /> : null;
    const content = !loading ? <CardList getRateMovieValues={getRateMovieValues} movieData={movieData} /> : null;
    const err =
      error || (movieData.length === 0 && !loading) ? (
        <Alert message="Movie not found" type="warning" showIcon />
      ) : null;
    console.log(activeTab);
    return (
      <Tabs
        onChange={(activeKey) => {
          this.setState({ activeTab: activeKey });
        }}
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
              <div>
                <Input onInput={getInputValue} placeholder="Type to search" />
                <section className="main">
                  {loader} {content} {err}
                </section>
              </div>
            ),
          },
          {
            label: 'Rated',
            key: '2',
            children: (
              <section className="main">
                <CardList movieData={ratedMovies} />
              </section>
            ),
          },
        ]}
      />
    );
  }
}
