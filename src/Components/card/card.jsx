/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Progress, Space, Tag, Typography, Rate } from 'antd';

import './card.css';
import Photo from './1.png';

export default class Card extends Component {
  render() {
    const { title, overview, releaseDate, posterPath, id, rateAvg, getRateMovieValues, rateValue, genres } = this.props;
    const { Title, Text } = Typography;
    let rateAvgColor = '#66E900';

    if (rateAvg <= 3) rateAvgColor = '#E90000';
    if (rateAvg > 3 && rateAvg <= 5) rateAvgColor = '#E97E00';
    if (rateAvg > 5 && rateAvg <= 7) rateAvgColor = '#E9D100';

    return (
      <li className="card">
        <div className="card__img">
          <img src={posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : Photo} alt="Movie" />
        </div>
        <div className="card__description">
          <div className="title-sec">
            <Title className="card__title" level={5}>
              {title}
            </Title>
            <Space>
              <Progress
                type="circle"
                strokeColor={rateAvgColor}
                percent={rateAvg * 10}
                format={(percent) => {
                  return percent / 10;
                }}
              />
            </Space>
            {/* <div className="rate-avg">{rateAvg}</div> */}
          </div>

          <Text type="secondary">{releaseDate}</Text>
          <Space size={[0, 8]} wrap>
            <Tag>{genres[0]}</Tag>
            <Tag>{genres[1]}</Tag>
          </Space>
          <Text className="card__text">{`${overview.replace(/^(.{90}[^\s]*).*/, '$1')}`}</Text>
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
