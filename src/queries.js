import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation loginAttempt($username: String!, $password: String!) {
    login(
        username: $username,
        password: $password
    ) {
        value
    }
}`
export const CREATE_USER = gql`
mutation createAttempt ($username: String!, $favoriteGenre: String!) {
    createUser(
        username: $username,
        favoriteGenre: $favoriteGenre
    ) {
        username
        favoriteGenre
    }
}`

export const ALL_AUTHORS = gql`
query{
  allAuthors {
    name
    id
    born
  }
}
`
export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        published
        author {
            name
            born
        }
    }
}
`
export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        published
    }
}
`
export const ADD_AUTHOR = gql`
mutation authorToAdd($name: String!) {
    addAuthor(name: $name) {
        name
    }
}`
export const HAS_AUTHOR = gql`
query authorExists($name: String!) {
    hasAuthor(name: $name)
}
`
export const SET_BIRTH = gql`
mutation changeBirth($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name,
        setBornTo: $setBornTo
    ) {
        name
        born
    }
}
`