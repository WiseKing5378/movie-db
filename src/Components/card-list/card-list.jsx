import { Component } from 'react';

import Card from '../card';
import './card-list.css';

export default class CardList extends Component {
  render() {
    return (
      <ul className="card-list">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </ul>
    );
  }
}
