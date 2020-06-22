import React, { useState } from 'react'
import { LOGIN, CREATE_USER } from '../queries'
import { useMutation } from '@apollo/client'

const Login = (props) => {
    const { loggedIn, setLoggedIn } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameCreate, setUsernameCreate] = useState('')
    const [favoriteGenre, setFavoriteGenre] = useState('')

    const [tryLogin] = useMutation(LOGIN)
    const [tryCreateUser] = useMutation(CREATE_USER)

    const submitLogin = (event) => {
        event.preventDefault()
        try {
            tryLogin({ variables: { username, password } })
            setUsername('')
            setPassword('')
            setLoggedIn(true)
        } catch (error) {
            console.log(error)
        }
    }
    const submitSignUp = (event) => {
        event.preventDefault()
        try {
            tryCreateUser({ variables: { username: usernameCreate, favoriteGenre } })
            setFavoriteGenre('')
            setUsernameCreate('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={submitLogin}>
                username <input value={username} onChange={({ target }) => setUsername(target.value)} /><br></br>
                password <input value={password} onChange={({ target }) => setPassword(target.value)} /><br></br>
                <button type='submit'>Submit</button>
            </form>
            <hr />
            <h4>Don't have an account? Sign up here:</h4>
            <form onSubmit={submitSignUp}>
                username <input value={usernameCreate} onChange={({ target }) => setUsernameCreate(target.value)} /><br></br>
                favorite genre <input value={favoriteGenre} onChange={({ target }) => setFavoriteGenre(target.value)} /><br></br>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default Login