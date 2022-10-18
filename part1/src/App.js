
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const Content = (props) => {
  const parts = props.parts.map(p => <Part name={p.name} exercises={p.exercises} />)
  const total = props.parts.map(p => p.exercises).reduce((x,y) => {return x+y}, 0)

  return (
    <div>
    {parts}
    <Total total={total} />
    </div>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts:[{
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    </div>
  )
}

export default App
