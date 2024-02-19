// import React from "react"
// import { ReactDOM } from "react"



const Course = ({course}) => {
  return(
    <div>
      <h2>{course.name}</h2>
      <div>
        {(course.parts).map((part, id)=>{
          return(
            <div>
              <h3>{part.name} {part.exercises}</h3>
            </div>
          )
        })}
      </div>
      <div>{(course.parts).reduce((accumulator, part)=>{
          return(
            <h3>total number of exercises are {part.exercises + accumulator} </h3>
          )
        }, 0)}
      </div>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  
  return (
    <div>
      <Course course={course}/>
    </div>
  )
}

export default App
