import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './Star.css'

const Star = () => {
    return <div className="star">
        <FontAwesomeIcon icon={faStar} />
    </div>
}

export default Star