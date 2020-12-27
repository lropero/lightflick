import axios from 'axios'

const useApi = () => ({
  discover: async () => {
    let movies = []
    try {
      const response = await axios.get(`${process.env.API}/discover/movie?api_key=${process.env.KEY}`)
      movies = (response.status === 200 && response.data.results) || movies
    } catch (error) {
      console.error(error.toString())
    }
    return movies
  },
  get: async id => {
    try {
      const response = await axios.get(`${process.env.API}/movie/${id}?api_key=${process.env.KEY}`)
      return response.status === 200 && response.data
    } catch (error) {
      console.error(error.toString())
    }
  },
  search: async term => {
    let movies = []
    try {
      const response = await axios.get(`${process.env.API}/search/movie?api_key=${process.env.KEY}&query=${encodeURIComponent(term)}`)
      movies = (response.status === 200 && response.data.results) || movies
    } catch (error) {
      console.error(error.toString())
    }
    return movies
  }
})

export default useApi
