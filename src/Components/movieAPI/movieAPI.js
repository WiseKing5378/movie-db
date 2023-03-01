/* eslint-disable class-methods-use-this */
export default class MovieAPI {
  async getData() {
    const resp = await fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=43c448fb99239c0dfa23de8a100fbf7c&language=en-US&query=hobbit&page=1&include_adult=false'
    );
    const data = await resp.json();
    return data.results;
  }
}
