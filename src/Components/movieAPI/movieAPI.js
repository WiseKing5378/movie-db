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
    console.log(data.guest_session_id);
    return data.guest_session_id;
  }
}
