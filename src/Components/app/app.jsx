import { Component } from 'react';

import CardList from '../card-list';
import Header from '../header';
import Footer from '../footer';
import MovieAPI from '../movieAPI/movieAPI';

export default class App extends Component {
  movieAPI = new MovieAPI();

  constructor() {
    super();
    this.state = {
      movieData: [],
    };
  }

  setMovieData = (name) => {
    // console.log(this.movieAPI.getData());
    this.movieAPI.getData(name).then((result) => {
      this.setState(() => {
        return {
          movieData: result.map((i) => {
            return {
              title: i.title,
              overview: i.overview,
              releaseDate: i.release_date,
              posterPath: i.poster_path,
              id: i.id,
            };
          }),
        };
      });
    });
  };

  render() {
    this.setMovieData('hobbit');
    const { movieData } = this.state;

    return (
      <section className="movieapp">
        <Header />
        <section className="main">
          <CardList movieData={movieData} />
        </section>
        <Footer />
      </section>
    );
  }
}
