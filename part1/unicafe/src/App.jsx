import { useState } from 'react'

const Button = (props) => {
  console.log(props);
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if(good+bad+neutral > 0){
    return(
      <div>
        <h2>Statistics</h2>
        <StatisticsLine text="Good:" value={good}/>
        <StatisticsLine text="Neutral:" value={neutral}/>
        <StatisticsLine text="Bad:" value={bad}/>
        <StatisticsLine text="All:" value={good+neutral+bad}/>
        <StatisticsLine text="Positive Percentage:" value={good*100/(good+neutral+bad) }/>
      </div>  
    )
  }
  else return(
    <div>
      <h2>Statistics</h2>
      <h3>No feedback given</h3>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>Give Feedback</h2>
      <Button onClick={()=>setGood(good+1)} text="Good"/>
      <Button onClick={()=>setNeutral(neutral+1)} text="Neutral"/>
      <Button onClick={()=>setBad(bad+1)} text="Bad"/>
      
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App
