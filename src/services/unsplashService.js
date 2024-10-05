import axios from "axios";

const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_UNSPLASH_BASE_URL,
  headers: {
    Authorization: `Client-ID ${apiKey}`,
  },
});

export default {
  getPhotos(page = 1, perPage = 10) {
    return apiClient.get(`/photos`, {
      params: { page, per_page: perPage },
    });
  },
  searchPhotos(query, page = 1, perPage = 10) {
    return apiClient.get(`/search/photos`, {
      params: { query, page, per_page: perPage },
    });
  },
};
