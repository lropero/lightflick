import axios from 'axios'

import manifest from 'lightflick/manifest'

const useApi = () => {
  return {
    popular: async () => {
      let movies = []
      try {
        const response = await axios.get(
          `${manifest.api}/movie/popular?api_key=${manifest.apiKey}`
        )
        movies = (response.status === 200 && response.data.results) || movies
      } catch (error) {
        console.error(error.toString())
      }
      return movies
    },
    search: async term => {
      let movies = []
      try {
        const response = await axios.get(
          `${manifest.api}/search/movie?api_key=${
            manifest.apiKey
          }&query=${encodeURIComponent(term)}`
        )
        movies = (response.status === 200 && response.data.results) || movies
      } catch (error) {
        console.error(error.toString())
      }
      return movies
    }
  }
}

export default useApi
