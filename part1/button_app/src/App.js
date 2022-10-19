import { useState } from 'react'

const Button = (props) => {
  return(<button onClick={props.handleClick}>{props.text}</button>)

}

const Heading = ({text}) => (<h1>{text}</h1>)

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({data}) => {
  console.log(data)

  let good = data.good
  let bad = data.bad
  let neutral = data.neutral

  let total = good.value+bad.value+neutral.value
  let avg = (good.value-bad.value)/total
  let pos = good.value/total

  if (total === 0) return(
    <div>
      <Heading text="statistics"/>
      <p>No feedback given</p>
    </div>
  )

  return(
    <div>
      <Heading text="statistics"/>
    <table>
      <tbody>
      <StatisticsLine text={good.name} value={good.value}/>
      <StatisticsLine text={neutral.name} value={neutral.value}/>
      <StatisticsLine text={bad.name} value={bad.value}/>
      <StatisticsLine text="all" value={total}/>
      <StatisticsLine text="average" value={avg}/>
      <StatisticsLine text="positive" value={pos + "%"}/>
    </tbody>
    </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good_val, setGood] = useState(0)
  const [neutral_val, setNeutral] = useState(0)
  const [bad_val, setBad] = useState(0)

  const incrementor = (value, setter) => () => setter(value+1) 

  const stats_data = {
    good: {
      name: "good",
      value: good_val
    },
    neutral: {
      name: "neutral",
      value: neutral_val
    },
    bad: {
      name: "bad",
      value: bad_val
    }
  }
  console.log(stats_data)

  return (
    <div>
    <Heading text="give feedback"/>
    <Button text="good" handleClick={incrementor(good_val,setGood)}/>
    <Button text="neutral" handleClick={incrementor(neutral_val, setNeutral)}/>
    <Button text="bad" handleClick={incrementor(bad_val,setBad)}/>
    <Statistics data={stats_data}/>
    </div>
  )
}

export default App
