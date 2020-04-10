import React from 'react'
import './Number.css'

const Number = ({ number, onClick, state }) => (
    <div
        className={"number " + state}
        onClick={onClick}>{number}</div>
)

export default Number