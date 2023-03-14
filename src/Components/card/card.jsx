/* eslint-disable class-methods-use-this */
import { format } from 'date-fns';
import { Component } from 'react';
import { Progress, Space, Tag, Typography, Rate, Image } from 'antd';

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
    let key = 0;
    const cardGenres = genres.map((i) => {
      key += 1;
      return <Tag key={key}>{i}</Tag>;
    });

    return (
      <li className="card">
        <div className="card__img">
          <Image width={183} height={281} src={posterPath ? `https://image.tmdb.org/t/p/w500/${posterPath}` : Photo} />
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
          </div>

          <Text type="secondary">{format(new Date(releaseDate), 'MMMM dd, yyyy')}</Text>
          <Space size={[0, 8]} wrap>
            {cardGenres}
          </Space>
          <Text className="card__text">{`${overview.replace(/^(.{90}[^\s]*).*/, '$1')}`}</Text>
          <Rate
            value={rateValue}
            className="rate"
            count="10"
            allowClear=""
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
