import { useState } from 'react'

const Button = (props) => {
  return(<button onClick={props.handleClick}>{props.text}</button>)

}

const Heading = ({text}) => (<h1>{text}</h1>)

const Feedback = ({text, value}) => (<p>{text} {value}</p>)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementor = (value, setter) => () => setter(value+1) 

  return (
    <div>
    <Heading text="give feedback"/>
    <Button text="good" handleClick={incrementor(good,setGood)}/>
    <Button text="neutral" handleClick={incrementor(neutral, setNeutral)}/>
    <Button text="bad" handleClick={incrementor(bad,setBad)}/>
    <Heading text="statistics"/>
    <Feedback text="good" value={good}/>
    <Feedback text="neutral" value={neutral}/>
    <Feedback text="bad" value={bad}/>
    </div>
  )
}

export default App
