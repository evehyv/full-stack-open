import { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, allFeedback, average, positive }) => {
  if (allFeedback.length > 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text='Good' value={good} />
          <StatisticsLine text='Neutral' value={neutral} />
          <StatisticsLine text='Bad' value={bad} />
          <StatisticsLine text='All' value={allFeedback.length} />
          <StatisticsLine text='Average' value={average} />
          <StatisticsLine text='Positive' value={`${positive} %`} />
        </tbody>
      </table>
    )
  }
  return (
    <div>No feedback given</div>
  )
}

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
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} allFeedback={allFeedback} average={average} positive={positive} />
    </>
  )
}

export default App