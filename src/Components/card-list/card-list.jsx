/* eslint-disable react/static-property-placement */

import { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../card';
import './card-list.css';

export default class CardList extends Component {
  static defaultProps = {
    getRateMovieValues: () => {},
  };

  static propTypes = {
    getRateMovieValues: PropTypes.func,
  };

  render() {
    const { movieData, getRateMovieValues } = this.props;

    const dataArr = movieData.map((i) => {
      const { title, overview, releaseDate, posterPath, id, rateAvg, rateValue, genres } = i;

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
          rateAvg={rateAvg}
          genres={genres}
        />
      );
    });

    return <ul className="card-list">{dataArr}</ul>;
  }
}
