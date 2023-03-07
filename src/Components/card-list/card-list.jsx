/* eslint-disable camelcase */
import { Component } from 'react';

import Card from '../card';
import './card-list.css';

export default class CardList extends Component {
  render() {
    const { movieData, getRateMovieValues } = this.props;

    const dataArr = movieData.map((i) => {
      const { title, overview, releaseDate, posterPath, id, rateValue } = i;

      return (
        <Card
          getRateMovieValues={getRateMovieValues}
          key={id}
          id={id}
          title={title}
          overview={overview}
          releaseDate={releaseDate}
          posterPath={posterPath}
          rateValue={rateValue}
        />
      );
    });

    return <ul className="card-list">{dataArr}</ul>;
  }
}
