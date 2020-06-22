
import React, { useState } from 'react'
import Select from 'react-select'
import { SET_BIRTH, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [born, setBorn] = useState('')
  const [changeBorn] = useMutation(SET_BIRTH, { refetchQueries: [{ query: ALL_AUTHORS }] })
  if (!props.show) {
    return null
  }
  const { authors } = props
  const options = []
  authors.map(a => options.push(Object.create({ value: a.name, label: a.name })))

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption)
  }

  const submit = (event) => {
    event.preventDefault()
    console.log(selectedOption)
    changeBorn({ variables: { name: selectedOption.value, setBornTo: Number(born) } })
    setSelectedOption('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h3>Set birth year</h3>

        <form onSubmit={submit}>
          <Select options={options} value={selectedOption} onChange={handleChange} />
          <br></br>
        born <input value={born}
            onChange={({ target }) => setBorn(target.value)} /><br></br>
          <button type='submit'>submit</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
