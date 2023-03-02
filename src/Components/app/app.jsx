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
      movie: 'g',
      page: 1,
      totalPages: 1,
      newPage: null,
    };
  }

  componentDidMount() {
    const { movie, page } = this.state;
    this.setMovieData(movie, page);
    this.getPage(1);
  }

  componentDidUpdate(prevProps, prevState) {
    const { movie, newPage } = this.state;
    if (movie !== prevState.movie || newPage !== prevState.newPage) {
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
            return {
              title: i.title,
              overview: i.overview,
              releaseDate: i.release_date,
              posterPath: i.poster_path,
              id: i.id,
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

  updateMovieState = (event) => {
    if (event.target.value.replace(/\s+/g, '')) this.setState({ movie: event.target.value });
  };

  getInputValue = (event) => {
    debounce(this.updateMovieState, 1000).call(this, event);
  };

  getPage = (page) => {
    this.setState({ newPage: page });
  };

  render() {
    const { movieData, loading, error, totalPages } = this.state;
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
        <Footer totalPages={totalPages} getPage={this.getPage} />
      </section>
    );
  }
}
