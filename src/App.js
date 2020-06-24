
import React, { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Notifications from './components/Notifications'
import Recommendation from './components/Recommendation'


const App = () => {
  const [token, setToken] = useState(window.localStorage.getItem('library-user-token'))
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  if (books.loading) {
    return <div>loading...</div>
  }
  if (authors.loading) {
    return <div>loading...</div>
  }
  if (token === null) {
    return <div>
      <Notifications
        notification={notification}
        setNotification={setNotification} />
      <Login
        token={token}
        setToken={setToken}
        notification={notification}
        setNotification={setNotification}
      />
    </div>
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommendations</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      <Notifications
        notification={notification}
        setNotification={setNotification} />

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
      />
      <Recommendation
        show={page === 'recommend'} />
      <Books
        show={page === 'books'}
        books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        authors={authors.data.allAuthors}
        books={books.data.allBooks}
        setNotification={setNotification}
      />

    </div>
  )
}

export default App