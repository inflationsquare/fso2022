import { useState } from 'react'

const Button = (props) => {
  return(<button onClick={props.handleClick}>{props.text}</button>)
}

const Anecdote = ({text, votes}) => {
  return(<div>
    <p>{text}</p>
    <p>has {votes} votes </p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [max_idx, setMaxIdx] = useState(0)

  const randomizer = () => {
    const seed = Math.random()
    const anecdotes_length = anecdotes.length
    const next_idx = Math.floor(seed*(anecdotes_length))
    setSelected(next_idx)
  }

  const voter = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] = points[selected] + 1
    setPoints(pointsCopy)

    const max_points = Math.max(...pointsCopy)
    setMaxIdx(pointsCopy.indexOf(max_points))
  }

  return (
    <div>
    <h1>Anecdote of the day</h1>
    <Anecdote text={anecdotes[selected]} votes={points[selected]}/>
    <Button text={"vote"} handleClick={voter}/>
    <Button text={"next anecdote"} handleClick={randomizer}/>
    <h1>Anecdote with most votes</h1>
    <Anecdote text={anecdotes[max_idx]} votes={points[max_idx]}/>
    </div>
  )
}

export default App
