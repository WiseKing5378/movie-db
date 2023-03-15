/* eslint-disable class-methods-use-this */
export default class MovieAPI {
  apiKey = '43c448fb99239c0dfa23de8a100fbf7c';

  baseUrl = 'https://api.themoviedb.org/3';

  async getData(name, page) {
    const resp = await fetch(
      `${this.baseUrl}/search/movie?query=${name}&page=${page}&api_key=${this.apiKey}&include_adult=false`
    );
    const data = await resp.json();

    return data;
  }

  async createGuestSession() {
    const resp = await fetch(`${this.baseUrl}/authentication/guest_session/new?api_key=${this.apiKey}`);
    const data = await resp.json();
    localStorage.setItem('tokenCreatedTime', JSON.stringify(Date.now()));
    return data.guest_session_id;
  }

  async rateMovie(sessionId, movieId, rateValue) {
    const resp = await fetch(
      `${this.baseUrl}/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ value: rateValue }),
      }
    );
    const data = await resp.json();
    return data.success;
  }

  async getRatedMovies(sessionId) {
    const resp = await fetch(`${this.baseUrl}/guest_session/${sessionId}/rated/movies?api_key=${this.apiKey}`);
    const data = await resp.json();
    return data.results;
  }

  async getGenres() {
    const resp = await fetch(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`);
    const data = await resp.json();
    return data.genres;
  }
}
