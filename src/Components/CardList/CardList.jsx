import PropTypes from 'prop-types';

import Card from '../Card';
import './CardList.css';

export default function CardList(props) {
  const { movieData, getRateMovieValues } = props;

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

CardList.defaultProps = {
  getRateMovieValues: () => {},
};

CardList.propTypes = {
  getRateMovieValues: PropTypes.func,
};
