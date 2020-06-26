import React, { useState, useEffect } from 'react'
import { ME, BOOK_BY_GENRE } from '../queries'
import { useQuery, useLazyQuery } from '@apollo/client'

const Recommendation = (props) => {

    const [recommended, setRecommended] = useState('')
    const me = useQuery(ME)
    const [recBooks, result] = useLazyQuery(BOOK_BY_GENRE, { variables: { genre: recommended } })

    useEffect(() => {
        if (me.data) {
            setRecommended(me.data.me.favoriteGenre)
        }
    }, [me])

    useEffect(() => {
        if (recommended) {
            const getThem = async (rec) => {
                try {
                    recBooks(recommended)
                } catch (error) {
                    console.log(error)
                }
            }
            getThem(recommended)
        }
    }, [recBooks, recommended])
    if (result.data && props.show) {
        return (
            <div>
                <h3>Recommendations based on your favorite genre: {recommended}</h3>
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
                        {result.data.filterByGenre.map(b =>
                            <tr key={b.title}>
                                <td>{b.title}</td>
                                <td>{b.author.name}</td>
                                <td>{b.published}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    return null
}
export default Recommendation