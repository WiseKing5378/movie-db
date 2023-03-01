import { Component } from 'react';
import { Spin, Alert } from 'antd';

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
    };
    this.setMovieData('hobbit');
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

  render() {
    const { movieData, loading, error } = this.state;
    const loader = loading ? <Spin size="large" /> : null;
    const content = !loading ? <CardList movieData={movieData} /> : null;
    const err = error ? <Alert message="Movie not found" type="warning" showIcon /> : null;
    return (
      <section className="movieapp">
        <Header />
        <section className="main">
          {loader} {content} {err}
        </section>
        <Footer />
      </section>
    );
  }
}
