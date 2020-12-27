// TODO: write test
const filterMovies = ({ movies, stars }) =>
  movies
    .filter(movie => stars === 0 || (movie.vote_average >= (stars - 1) * 2 && movie.vote_average <= stars * 2))
    .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))

export default filterMovies
