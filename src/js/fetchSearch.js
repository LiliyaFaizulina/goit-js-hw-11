import axios from 'axios';

export class SearchQuery {
  baseURL = 'https://pixabay.com/api/';
  params = {
    key: '29832103-c5c7aecb1381f27e358e050a9',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  };
  async getResponse(query) {
    if (query) {
      this.params.q = query;
    }

    const config = {
      params: this.params,
    };
    return await axios.get(this.baseURL, config);
  }

  increasePage() {
    this.params.page += 1;
  }

  setPage() {
    this.params.page = 1;
  }
}
