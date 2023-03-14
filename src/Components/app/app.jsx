/* eslint-disable no-param-reassign */
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
      newPage: 1,
      sessionId: null,
      rateMovieId: null,
      rateValue: null,
      genresData: null,
    };
  }

  componentDidMount() {
    const { movie, newPage } = this.state;
    if (Date.now() - JSON.parse(localStorage.getItem('tokenCreatedTime')) > 86400000) {
      localStorage.clear();
    }
    if (JSON.parse(localStorage.getItem('token')) === null) {
      this.movieAPI.createGuestSession().then((data) => {
        this.setState({ sessionId: data });
      });
    } else {
      this.setState({ sessionId: JSON.parse(localStorage.getItem('token')) });
    }

    this.movieAPI
      .getGenres()
      .then((res) => {
        this.setState({ loading: true, genresData: res });
      })
      .then(() => {
        this.setMovieData(movie, newPage);
      });

    this.addRatedMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { rateMovieId, rateValue, sessionId, movie, newPage } = this.state;

    if (movie !== prevState.movie || newPage !== prevState.newPage) {
      this.setState({ loading: true });
    }

    if (rateMovieId !== prevState.rateMovieId || rateValue !== prevState.rateValue) {
      this.movieAPI.rateMovie(sessionId, rateMovieId, rateValue).then((res) => {
        if (res) this.addRatedMovies();
      });
      this.updateRate(rateMovieId, rateValue);
    }

    if (movie !== prevState.movie) {
      this.getPage(1);
      this.setMovieData(movie, 1);
    }
    if (newPage !== prevState.newPage) this.setMovieData(movie, newPage);
  }

  setError = () => {
    this.setState({ error: true, loading: false });
  };

  setMovieData = (name, page) => {
    this.movieAPI
      .getData(name, page)
      .then((data) => {
        const { genresData } = this.state;
        this.setState({
          movieData: data.results.map((i) => {
            const lsItem = JSON.parse(localStorage.getItem('ratedMovies')).filter((item) => item.id === i.id);
            const itemGenresArr = [];
            genresData.forEach((element) => {
              i.genre_ids.forEach((el) => {
                if (el === element.id) {
                  itemGenresArr.push(element.name);
                }
              });
            });
            return {
              title: i.title,
              overview: i.overview,
              releaseDate: i.release_date,
              posterPath: i.poster_path,
              id: i.id,
              rateValue: lsItem.length !== 0 ? lsItem[0].rateValue : null,
              rateAvg: Number(i.vote_average.toFixed(1)),
              genres: itemGenresArr,
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
            i = { ...i, rateValue };
          }
          return i;
        }),
      };
    });
  };

  addRatedMovies = () => {
    const { movieData, rateMovieId, sessionId, rateValue } = this.state;

    if (localStorage.length === 0 || localStorage.getItem('ratedMovies') === '[]') {
      localStorage.setItem('ratedMovies', JSON.stringify(movieData.filter((i) => i.rateValue)));
      localStorage.setItem('token', JSON.stringify(sessionId));
    }
    let arrLocal = JSON.parse(localStorage.getItem('ratedMovies'));
    const movieDataItem = movieData.filter((i) => i.id === rateMovieId);
    const arrItem = arrLocal.filter((i) => i.id === rateMovieId);

    if (arrItem.length === 0) {
      arrLocal.push(...movieDataItem);
    } else if (arrItem[0].rateValue !== rateValue) {
      arrLocal = arrLocal.map((i) => {
        if (i.id === rateMovieId) i.rateValue = rateValue;
        return i;
      });
    }
    localStorage.setItem('ratedMovies', JSON.stringify(arrLocal));
    this.setState({ loading: false });
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
          ratedMovies={JSON.parse(localStorage.getItem('ratedMovies')) || []}
          totalPages={totalPages}
          getPage={this.getPage}
          newPage={newPage}
        />
      </section>
    );
  }
}
