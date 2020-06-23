import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ADD_AUTHOR } from '../queries'

const NewBook = (props) => {
  const { authors, setNotification } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, { refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }] })
  const [createAuthor, result] = useMutation(ADD_AUTHOR, {
    onError: (error) => {
      setNotification(error.graphQLErrors[0].message)
      setTimeout(() => {
        setNotification('')
      }, 3000);
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: [...dataInStore.allAuthors, response.data.addAuthor]
        }
      })
    }
  },
    { refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }] })

  useEffect(() => {
    if (result.data) {
      console.log('result of add author', result.data)
      createBook({ variables: { title, author: result.data.addAuthor.id, published: Number(published), genres } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    let hasAuthor = authors.filter(a => a.name === author).length === 1
    if (hasAuthor) {
      let idArray = authors.map(a => a.name === author ? a.id : null).filter(i => i)
      let id = idArray[0]
      await createBook({ variables: { title, author: id, published: Number(published), genres } })
    }
    if (!hasAuthor) {
      await createAuthor({ variables: { name: author } })
    }
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook