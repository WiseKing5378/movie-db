/* eslint-disable class-methods-use-this */
export default class MovieAPI {
  async getData(name) {
    const resp = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&page=1&api_key=43c448fb99239c0dfa23de8a100fbf7c`
    );
    const data = await resp.json();
    return data.results;
  }
}
