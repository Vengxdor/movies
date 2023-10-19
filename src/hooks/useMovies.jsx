import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../service/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previuosSearch = useRef(search)

  const getMovies = useCallback(
    async ({ search }) => {
      if (search === previuosSearch.current) return
      try {
        setError(null)
        setLoading(true)
        previuosSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }, [])
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading, error }
}
