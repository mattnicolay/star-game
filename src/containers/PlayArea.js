import React, { useCallback } from 'react';
import Display from '../components/Display/Display';
import Number from '../components/Number/Number';
import Star from '../components/Star/Star';
import './PlayArea.css'

const PlayArea = () => {
    const getRandomInt = useCallback((min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }, [])


    const [stars, setStars] = React.useState(getRandomInt(1, 9))
    const [availableNumbers, setAvailableNumbers] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [candidates, setCandidates] = React.useState([])
    const [successful, setSuccessful] = React.useState([])
    const [sum, setSum] = React.useState([])

    React.useEffect(() => {
        setAvailableNumbers(prevAvailableNumbers => {
            return prevAvailableNumbers.filter(availableNumber => {
                return !candidates.find(candidate => candidate === availableNumber)
            })
        })
        setSum(candidates.reduce((total, num) => total + num, 0))
    }, [candidates])

    React.useEffect(() => {
        console.log('[useEffect] sum === stars');

        if (sum === stars) {
            setSuccessful(candidates)
            setCandidates([])
            setStars(getRandomInt(Math.min(...availableNumbers), Math.max(...availableNumbers)))
        }
    }, [sum, stars, setStars, availableNumbers, getRandomInt, candidates])

    const numberClickedHandler = (number) => {
        if (availableNumbers.find(n => n === number)) {
            setCandidates(prevCandidates => [...prevCandidates, number])
        } else if (candidates.find(n => n === number)) {
            setCandidates(prevCandidates => prevCandidates.filter(n => n !== number))
        }
    }

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
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
            key={num}
            number={num}
            state={state}
            onClick={() => numberClickedHandler(num)} />
    })



    return <div className="play-area">
        <div className="directions">Select 1 or more numbers whose sum equals the number of stars</div>
        <div className="displays">
            <Display>
                {[...Array(stars).keys()].map((key) => <Star key={key} />)}
            </Display>
            <Display>
                {numbers}
            </Display>
        </div>
    </div>
}

export default PlayArea