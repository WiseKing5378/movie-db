/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { debounce } from 'lodash';

import MainTabs from '../MainTabs';
import MovieAPI from '../movieAPI/movieAPI';
import './app.css';

export default class App extends Component {
  movieAPI = new MovieAPI();

  constructor() {
    super();
    this.state = {
      movieData: [],
      loading: true,
      error: false,
      movie: 'hobbit',
      totalPages: null,
      newPage: null,
      sessionId: null,
      rateMovieId: null,
      rateValue: null,
    };
  }

  componentDidMount() {
    this.movieAPI.createGuestSession().then((data) => {
      this.setState({ sessionId: data });
    });

    const { movie } = this.state;
    this.setMovieData(movie, 1);
    this.getPage(1);

    this.addRatedMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { rateMovieId, rateValue, sessionId } = this.state;

    if (rateMovieId && rateValue && rateMovieId !== prevState.rateMovieId && rateValue !== prevState.rateValue) {
      this.movieAPI.rateMovie(sessionId, rateMovieId, rateValue);
    }

    if (rateValue !== prevState.rateValue || rateMovieId !== prevState.rateMovieId) {
      this.updateRate(rateMovieId, rateValue);
    }

    setTimeout(() => {
      this.addRatedMovies();
    });
    const { movie, newPage } = this.state;
    if (movie !== prevState.movie) {
      this.setState({ loading: true });
      this.setMovieData(movie, 1);
    }
    if (newPage !== prevState.newPage) {
      this.setState({ loading: true });
      this.setMovieData(movie, newPage);
    }
  }

  setError = () => {
    this.setState({ error: true, loading: false });
  };

  setMovieData = (name, page) => {
    this.movieAPI
      .getData(name, page)
      .then((data) => {
        this.setState({
          movieData: data.results.map((i) => {
            const lsItem = JSON.parse(localStorage.getItem('ratedMovies')).filter((item) => item.id === i.id);
            return {
              title: i.title,
              overview: i.overview,
              releaseDate: i.release_date,
              posterPath: i.poster_path,
              id: i.id,
              rateValue: lsItem.length !== 0 ? lsItem[0].rateValue : null,
              rateAvg: Number(i.vote_average.toFixed(1)),
            };
          }),
          loading: false,
          totalPages: data.total_pages,
        });
      })
      .catch(() => {
        this.setError();
      });
  };

  updateRate = (movieId, rateValue) => {
    this.setState(({ movieData }) => {
      return {
        movieData: movieData.map((i) => {
          if (i.id === movieId) {
            // eslint-disable-next-line no-param-reassign
            i = { ...i, rateValue };
          }
          return i;
        }),
      };
    });
  };

  addRatedMovies = () => {
    const { movieData, rateMovieId, sessionId } = this.state;
    if (localStorage.length === 0 || localStorage.getItem('ratedMovies') === '[]') {
      localStorage.setItem('ratedMovies', JSON.stringify(movieData.filter((i) => i.rateValue)));
      localStorage.setItem('token', JSON.stringify(sessionId));
    }
    const arrLocal = JSON.parse(localStorage.getItem('ratedMovies'));

    const arr = arrLocal.filter((i) => i.id === rateMovieId);

    if (arr.length === 0) {
      arrLocal.push(...movieData.filter((i) => i.id === rateMovieId));
    }
    localStorage.setItem('ratedMovies', JSON.stringify(arrLocal));
  };

  updateMovieState = (event) => {
    if (event.target.value.replace(/\s+/g, '')) this.setState({ movie: event.target.value });
  };

  getInputValue = (event) => {
    debounce(this.updateMovieState, 1000).call(this, event);
  };

  getPage = (page) => {
    this.setState({ newPage: page });
  };

  getRateMovieValues = (value, id) => {
    this.setState({ rateMovieId: id, rateValue: value });
  };

  render() {
    const { movieData, loading, error, totalPages, newPage } = this.state;

    return (
      <section className="movieapp">
        <MainTabs
          getRateMovieValues={this.getRateMovieValues}
          loading={loading}
          movieData={movieData}
          error={error}
          getInputValue={this.getInputValue}
          ratedMovies={JSON.parse(localStorage.getItem('ratedMovies'))}
          totalPages={totalPages}
          getPage={this.getPage}
          newPage={newPage}
        />
      </section>
    );
  }
}
