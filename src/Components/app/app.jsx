/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import { Spin, Alert } from 'antd';
import { debounce } from 'lodash';

import CardList from '../card-list';
import Header from '../header';
import Footer from '../footer';
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
    };
  }

  componentDidMount() {
    const { movie } = this.state;
    this.setMovieData(movie);
  }

  componentDidUpdate(prevProps, prevState) {
    const { movie } = this.state;

    if (movie !== prevState.movie) {
      this.setState({ loading: true });
      this.setMovieData(movie);
    }
  }

  setError = () => {
    this.setState({ error: true, loading: false });
  };

  setMovieData = (name) => {
    this.movieAPI
      .getData(name)
      .then((result) => {
        this.setState({
          movieData: result.map((i) => {
            return {
              title: i.title,
              overview: i.overview,
              releaseDate: i.release_date,
              posterPath: i.poster_path,
              id: i.id,
            };
          }),
          loading: false,
        });
      })
      .catch(() => {
        this.setError();
      });
  };

  updateMovieState = (event) => {
    if (event.target.value.replace(/\s+/g, '')) this.setState({ movie: event.target.value });
  };

  getInputValue = (event) => {
    debounce(this.updateMovieState, 1000).call(this, event);
  };

  render() {
    const { movieData, loading, error } = this.state;

    const loader = loading ? <Spin size="large" /> : null;
    const content = !loading ? <CardList movieData={movieData} /> : null;
    const err =
      error || (movieData.length === 0 && !loading) ? (
        <Alert message="Movie not found" type="warning" showIcon />
      ) : null;

    return (
      <section className="movieapp">
        <Header getInputValue={this.getInputValue} />
        <section className="main">
          {loader} {content} {err}
        </section>
        <Footer />
      </section>
    );
  }
}
