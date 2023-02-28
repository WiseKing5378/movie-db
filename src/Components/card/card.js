import { Component } from 'react';
import { Space, Tag, Typography, Rate } from 'antd';

import './card.css';
import Photo from './1.png';

export default class Card extends Component {
  render() {
    const text =
      'A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high';
    const { Title, Text } = Typography;
    return (
      <li className="card">
        <div className="card__img">
          <img src={Photo} alt="Movie" />
        </div>
        <div className="card__description">
          <Title className="card__title" level={3}>
            Movie test
          </Title>
          <Text type="secondary">Date 12.12.2010</Text>
          <Space size={[0, 8]} wrap>
            <Tag>Tag 1</Tag>
            <Tag>Tag 2</Tag>
          </Space>
          <Text className="card__text">{`${text.replace(/^(.{200}[^\s]*).*/, '$1')}...`}</Text>
          <Rate className="rate" count="10" allowHalf="true" />
        </div>
      </li>
    );
  }
}
