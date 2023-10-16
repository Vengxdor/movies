import React, { useState, useEffect, useRef } from 'react'
import { Movies } from './components/list-of-movies'
import { useMovies } from './hooks/useMovies'

function useSearch () {
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

function App () {
  const { updateSearch, search, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (e) => {
    //! reminder: this re-render all when you type in the input
    updateSearch(e.target.value)
  }

  return (
    <>
    <header className='flex flex-col items-center my-5'>
      <h1 className='text-3xl mb-2'>Movies App</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={search} className='mr-1 p-1 rounded-md outline-none border-none text-black' autoComplete='off' placeholder='Spiderman, Avengers...' type="text" name="search" id="search" />
        <button type='submit'>Search</button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </header>
      <main>
        <Movies listMovies={movies}/>
      </main>
    </>
  )
}

export default App
