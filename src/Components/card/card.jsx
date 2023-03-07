/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Space, Tag, Typography, Rate } from 'antd';

import './card.css';
import Photo from './1.png';

export default class Card extends Component {
  render() {
    const { title, overview, releaseDate, posterPath, id, getRateMovieValues, rateValue } = this.props;
    const { Title, Text } = Typography;
    return (
      <li className="card">
        <div className="card__img">
          <img src={posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : Photo} alt="Movie" />
        </div>
        <div className="card__description">
          <Title className="card__title" level={4}>
            {title}
          </Title>
          <Text type="secondary">{releaseDate}</Text>
          <Space size={[0, 8]} wrap>
            <Tag>Tag 1</Tag>
            <Tag>Tag 2</Tag>
          </Space>
          <Text className="card__text">{`${overview.replace(/^(.{90}[^\s]*).*/, '$1')}...`}</Text>
          <Rate
            value={rateValue}
            className="rate"
            count="10"
            allowHalf="true"
            onChange={(value) => {
              getRateMovieValues(value, id);
            }}
          />
        </div>
      </li>
    );
  }
}
