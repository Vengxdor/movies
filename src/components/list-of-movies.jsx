/* eslint-disable react/prop-types */
import React from 'react'

function ListOfMovies ({ movies }) {
  return (
    <ul className=' movies'>
      {movies.map((movie) => (
        <li key={movie.id}>
          <img
            className='aspect-[2/3] object-cover mb-2'
            src={movie.image}
            alt={movie.title}
          />
          <h3 className='text-xl'>{movie.title}</h3>
          <span>{movie.year}</span>
        </li>
      ))}
    </ul>
  )
}

function NoMovies () {
  return (
        <p className='flex justify-center text-red-500'>{"There's no movies"}</p>
  )
}

export function Movies ({ listMovies }) {
  const hasMovies = listMovies?.length > 0
  return (
    hasMovies
      ? <ListOfMovies movies={listMovies} />
      : <NoMovies />
  )
}
