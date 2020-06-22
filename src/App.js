
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'


const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)


  const [page, setPage] = useState('authors')


  if (books.loading) {
    return <div>loading...</div>
  }
  if (authors.loading) {
    return <div>loading...</div>
  }
  if (!loggedIn) {
    return <div>
      <Login
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </div>
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        authors={authors.data.allAuthors}
        books={books.data.allBooks}
      />

    </div>
  )
}

export default App