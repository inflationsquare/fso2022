
const Header = (props) => {
  return (
    <div>
      <h2>{props.text}</h2>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      {props.name} {props.exercises}
    </>
  )
}


const Total = ({total}) => {
  return (
    <>
    <strong>Number of exercises {total}</strong>
    </>
  )
}


const Content = (props) => {
  const parts = props.parts.map(p => <li key={p.id}><Part name={p.name} exercises={p.exercises} /></li>)
  const total = props.parts.map(p => p.exercises).reduce((x,y) => {return x+y}, 0)

  return (
    <>
    {parts}
    <li key={-1}><Total total={total} /></li>
    </>
  )

}


const Course = (props) => {
  return(
    <div>
    <Header text={props.name} />
    <ul>
    <Content parts={props.parts} />
    </ul>
    </div>
  )
}

export default Course
