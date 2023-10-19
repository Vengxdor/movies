import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError("You can't search an emtpy movie")
      return
    }
    if (search.match(/^\d+$/)) {
      setError("You can't search a movie with number")
      return
    }

    if (search.length < 3) {
      setError('The search have to be more than 3 characters')
      return
    }

    setError(null)
  }, [search])

  return {
    search, error, updateSearch
  }
}
