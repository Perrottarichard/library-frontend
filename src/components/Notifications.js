import React from 'react'

const Notifications = (props) => {

    const { notification } = props

    if (notification !== '') {
        return (
            <div>
                <h1> {notification} </h1>
            </div>
        )
    }
    return null
}
export default Notifications