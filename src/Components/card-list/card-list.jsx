/* eslint-disable camelcase */
import { Component } from 'react';

import Card from '../card';
import './card-list.css';

export default class CardList extends Component {
  render() {
    const { movieData } = this.props;

    let keyMax = 0;
    const dataArr = movieData.map((i) => {
      const { title, overview, releaseDate, posterPath } = i;
      keyMax += 1;
      return <Card key={keyMax} title={title} overview={overview} releaseDate={releaseDate} posterPath={posterPath} />;
    });

    return <ul className="card-list">{dataArr}</ul>;
  }
}
