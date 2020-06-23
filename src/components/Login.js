import React, { useState, useEffect } from 'react'
import { LOGIN, CREATE_USER } from '../queries'
import { useMutation } from '@apollo/client'

const Login = (props) => {
    const { setNotification, setToken } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toggle, setToggle] = useState(false)

    const [usernameCreate, setUsernameCreate] = useState('')
    const [favoriteGenre, setFavoriteGenre] = useState('')

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setNotification(error.graphQLErrors[0].message)
            setTimeout(() => {
                setNotification('')
            }, 3000);
            setUsername('')
            setPassword('')
        }
    })
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    const [tryCreateUser] = useMutation(CREATE_USER)

    const submitLogin = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
    }


    const submitSignUp = async (event) => {
        event.preventDefault()
        try {
            await tryCreateUser({ variables: { username: usernameCreate, favoriteGenre } })
            setFavoriteGenre('')
            setUsernameCreate('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submitLogin}>
                username <input value={username} onChange={({ target }) => setUsername(target.value)} /><br></br>
                password <input type='password' value={password} onChange={({ target }) => setPassword(target.value)} /><br></br>
                <button type='submit'>Submit</button>
            </form>
            <hr />
            <h4>Don't have an account?</h4>
            <button onClick={() => setToggle(!toggle)}>{(toggle) ? 'Hide' : 'Sign up'}</button>
            {(toggle) ?
                <form onSubmit={submitSignUp}>
                    username <input value={usernameCreate} onChange={({ target }) => setUsernameCreate(target.value)} /><br></br>
                favorite genre <input value={favoriteGenre} onChange={({ target }) => setFavoriteGenre(target.value)} /><br></br>
                    <button type='submit'>Submit</button>
                </form>
                : null}
        </div>
    )
}
export default Login