import { Component } from 'react';

import CardList from '../card-list';
import Header from '../header';
import Footer from '../footer';

export default class App extends Component {
  render() {
    return (
      <section className="movieapp">
        <Header />
        <section className="main">
          <CardList />
        </section>
        <Footer />
      </section>
    );
  }
}
