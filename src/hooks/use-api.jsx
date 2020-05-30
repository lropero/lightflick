import axios from 'axios'

import config from 'lightflick/../config'

const useApi = () => {
  return {
    get: async id => {
      try {
        const response = await axios.get(
          `${config.api}/movie/${id}?api_key=${config.key}`
        )
        return response.status === 200 && response.data
      } catch (error) {
        console.error(error.toString())
      }
    },
    popular: async () => {
      let movies = []
      try {
        const response = await axios.get(
          `${config.api}/movie/popular?api_key=${config.key}`
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
          `${config.api}/search/movie?api_key=${
            config.key
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
