import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const Display = ({ value }) => (
  <div>{value}</div>
)

const Statistics = ({ good, neutral, bad, allFeedback, average, positive }) => (
  <>
    <h1>Statistics</h1>
    <Display value={`Good ${good}`} />
    <Display value={`Neutral ${neutral}`} />
    <Display value={`Bad ${bad}`} />
    <Display value={`All ${allFeedback.length}`} />
    <Display value={`Average ${average}`} />
    <Display value={`Positive ${positive} %`} />
  </>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAllFeedback] = useState([])
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedAllFeedback = allFeedback.concat(1)
    const updatedGood = good + 1
    setGood(updatedGood)
    updateStatistics(updatedAllFeedback)
  }

  const handleNeutralClick = () => {
    const updatedAllFeedback = allFeedback.concat(0)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    updateStatistics(updatedAllFeedback)
  }

  const handleBadClick = () => {
    const updatedAllFeedback = allFeedback.concat(-1)
    const updatedBad = bad + 1
    setBad(updatedBad)
    updateStatistics(updatedAllFeedback)
  }

  const updateStatistics = (updatedAllFeedback) => {
    const sumOfAll = updatedAllFeedback.reduce((sum, value) => sum + value, 0)
    const updatedAverage = sumOfAll / updatedAllFeedback.length
    const positiveFeedbackCount = updatedAllFeedback.filter(value => value === 1).length
    const updatedPositive = (positiveFeedbackCount / updatedAllFeedback.length) * 100
    setAllFeedback(updatedAllFeedback)
    setAverage(updatedAverage)
    setPositive(updatedPositive)
  }

  return (
    <>
      <h1>Give feedback</h1>
      <Button text='Good' handleClick={handleGoodClick} />
      <Button text='Neutral' handleClick={handleNeutralClick} />
      <Button text='Bad' handleClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} allFeedback={allFeedback} average={average} positive={positive} />
    </>
  )
}

export default App