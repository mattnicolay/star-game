import React from 'react'
import './Number.css'

const Number = ({ number, onClick, state, disabled }) => (
    <div
        className={`number ${disabled ? 'error' : state}`}
        onClick={disabled ? null : onClick}>
        {number}
    </div>
)

export default Number