import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useCallback } from 'react';
import Display from '../components/Display/Display';
import GameEnd from '../components/GameEnd/GameEnd';
import Number from '../components/Number/Number';
import Star from '../components/Star/Star';
import './PlayArea.css';

const PlayArea = () => {
    const getRandomInt = useCallback((min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, [])

    const [started, setStarted] = React.useState(false)
    const allNumbers = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9])[0]
    const [stars, setStars] = React.useState(getRandomInt(1, 9))
    const [availableNumbers, setAvailableNumbers] = React.useState([...allNumbers])
    const [candidates, setCandidates] = React.useState([])
    const [successful, setSuccessful] = React.useState([])
    const [sum, setSum] = React.useState([])
    const [outcome, setOutcome] = React.useState(null)
    const [time, setTime] = React.useState(10)

    React.useEffect(() => {
        if (outcome !== 'win' && started) {
            if (time > 0) {
                setTimeout(() => { setTime(prevTime => prevTime - 1) }, 1000)
            } else {
                setOutcome('lose')
            }
        }
    }, [time, outcome, started])

    const getStarValues = (numbers) => {
        let starValues = new Set([...numbers])
        const temp = [...numbers]
        numbers.forEach(n1 => temp.forEach(n2 => {
            if (n1 !== n2) {
                const sum = n1 + n2
                if (sum <= 9) {
                    starValues.add(sum)
                }
            }
        }))

        return [...starValues.keys()]
    }

    React.useEffect(() => {
        if (sum === stars) {
            setSuccessful(prevSuccessful => prevSuccessful.concat(candidates))
            setCandidates([])
            const starValues = getStarValues(availableNumbers)
            setStars(starValues[getRandomInt(0, starValues.length - 1)])
        }
    }, [sum, stars, setStars, availableNumbers, getRandomInt, candidates])

    React.useEffect(() => {
        setAvailableNumbers(allNumbers.filter(availableNumber => {
            return (!candidates.find(candidate => candidate === availableNumber) &&
                !successful.find(candidate => candidate === availableNumber))
        }))
        setSum(candidates.reduce((total, num) => total + num, 0))
    }, [candidates, allNumbers, successful])

    React.useEffect(() => {
        if (successful.length === 9) {
            setOutcome('win')
        }
    }, [successful])

    const numberClickedHandler = (number) => {
        if (availableNumbers.find(n => n === number)) {
            setCandidates(prevCandidates => [...prevCandidates, number])
        } else if (candidates.find(n => n === number)) {
            setCandidates(prevCandidates => prevCandidates.filter(n => n !== number))
        }
    }

    const numbers = allNumbers.map(num => {
        let state = 'available'

        if (successful.find(n => n === num)) {
            state = 'success'
        } else if (candidates.find(n => n === num)) {
            if (sum > stars) {
                state = 'error'
            } else {
                state = 'candidate'
            }
        }

        return <Number
            disabled={outcome === 'lose'}
            key={num}
            number={num}
            state={state}
            onClick={() => numberClickedHandler(num)} />
    })

    const resetGame = () => {
        setStars(getRandomInt(1, 9))
        setAvailableNumbers([...allNumbers])
        setCandidates([])
        setSuccessful([])
        setSum(0)
        setOutcome(null)
        setTime(10)
    }

    const getStars = () => {
        if (outcome) {
            return <GameEnd outcome={outcome} onClickHandler={resetGame} />
        } else {
            return [...Array(stars).keys()].map((key) => <Star key={key} />)
        }
    }

    const playArea = started
        ? <Fragment>
            <div className="timer"><FontAwesomeIcon icon={faClock} /> {time}</div>
            <div className="displays">
                <Display>
                    {getStars()}
                </Display>
                <Display>
                    {numbers}
                </Display>
            </div>
        </Fragment>
        : <button className='start-button' onClick={() => { setStarted(true) }}>Start</button>

    return <div className="play-area">
        <div className="directions">Select 1 or more numbers whose sum equals the number of stars before time runs out!</div>
        {playArea}
    </div>
}

export default PlayArea