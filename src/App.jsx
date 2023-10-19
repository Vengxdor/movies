import React, { useState, useCallback } from 'react'
import { Movies } from './components/list-of-movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'
import { useSearch } from './hooks/useSearch'

function App () {
  const { updateSearch, search, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => { getMovies({ search }) }, 500)
    , [])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleChange = (e) => {
    //! reminder: this re-render all when you type in the input
    const newSearch = e.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }
  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <>
    <header className='flex flex-col items-center my-5'>
      <h1 className='text-3xl mb-2'>Movies App</h1>
      <form onSubmit={handleSubmit}>
        <input style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }} onChange={handleChange} value={search} className='mr-1 p-1 rounded-md outline-none border-none text-black' autoComplete='off' placeholder='Spiderman, Avengers...' type="text" name="search" id="search" />
        <input className='mx-2' onChange={handleSort} checked={sort} type="checkbox"/>
        <button type='submit'>Search</button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
    </header>
      <main>
        {
          loading ? <p className='flex justify-center'>Loading...</p> : <Movies listMovies={movies}/>
        }

      </main>
    </>
  )
}

export default App
