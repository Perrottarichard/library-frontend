import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOK_BY_GENRE } from '../queries'


const Books = (props) => {
  const { books } = props
  const [byGenre, setByGenre] = useState('')
  const [chosenGenre, { called, loading, data }] = useLazyQuery(BOOK_BY_GENRE, { variables: { genre: byGenre } })

  const click = (selected) => {
    setByGenre(selected)
  }
  useEffect(() => {
    if (byGenre !== '') {
      console.log(byGenre)
      console.log('useEffect running')
      const getIt = async (value) => {
        try {
          chosenGenre(value)
        } catch (error) {
          console.log(error)
        }
      }
      getIt(byGenre)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [byGenre])
  if (!props.show) {
    return null
  }

  let uniqueGenres = books.map(b => b.genres.map(g => g))
  let flattened = uniqueGenres.flat()
  flattened = [...new Set(flattened)]

  if (called && loading) return <p>Loading...</p>
  if (!called) {
    return (
      <div>
        <h2>Choose a genre to display books</h2>
        <hr />
        {flattened.map(f => <button key={f} onClick={() => click(f)} value={f}>{f}</button>)}</div>
    )
  }

  return (
    <div>
      <hr />
      <h2>books by genre: {byGenre}</h2>
      {flattened.map(f => <button key={f} onClick={() => click(f)} value={f}>{f}</button>)}
      <hr />
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.filterByGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Books