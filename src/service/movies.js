export function searchMovies ({ search }) {
  if (search === '') return null
  if (search) {
    // setResponseMovies(Results)
    return fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=c40345b2&s=${search}`)
      .then((res) => res.json())
      .then((data) => {
        // map the movies and don't detent of the api
        const movies = data.Search
        return movies?.map((movie) => ({
          id: movie.imdbID,
          image: movie.Poster,
          title: movie.Title,
          year: movie.Year
        }))
      })
  } else {
    throw new Error('Error searching movies')
  }
}
