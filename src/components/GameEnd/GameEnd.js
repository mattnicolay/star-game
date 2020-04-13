import React from 'react'
import './GameEnd.css'

const GameEnd = ({ outcome, onClickHandler }) => (
    <div className='game-end-container'>
        <div className={outcome}>{outcome === 'win' ? 'You win!' : 'Game over'}</div>
        <button className='play-again-button' onClick={onClickHandler}>Play again</button>
    </div>
)

export default GameEnd