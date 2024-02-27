/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import axios from 'axios';

// const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

function App() {
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null)

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(async (response)=>{
      const all = await response.data;
      console.log(all);
      setData(all)
    })
    .catch(error => console.error('Error fetching data:', error))
  }, [])
  
  // useEffect(()=>{
  //   if(selectedCountry){
  //     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCountry.capital[0]}&appid=${API_KEY}`)
  //       .then(response => setWeather(response.data))
  //       .catch(error => console.error('Error fetching weather data:', error))
  //       console.log(weather);
  //   }
  // }, [selectedCountry])

  const dataToShow = data.filter((country) => country.name.common.toLowerCase().includes(searchVal.toLowerCase()))

  const handleChange = (e) => {
    setSearchVal(e.target.value);
    setSelectedCountry(null)
  }

  const showDetails = (country) => {
    setSelectedCountry(country)
  }

  return (
    <>
      <input onChange={handleChange} value={searchVal} placeholder='search country'/>
      {dataToShow.length > 10 && (<h5>Too many matches, specify another filter</h5>)}
      {dataToShow.length <= 10 && dataToShow.length > 1 && (dataToShow.map((country, id)=>
        (<div key={id}>
          {country.name.common}
          <button onClick={() => showDetails(country)}>Show Details</button>
        </div>)
      ))}
      {dataToShow.length===1 && (<Country value={dataToShow[0]} weather={weather}></Country>)}
      {selectedCountry && (<Country value={selectedCountry} weather={weather}></Country>)}
    </>
  )
}

const Country = ({value, weather}) => {
  return (
    <>
      <h2>{value.name.common}</h2>
      <h4>Capital: {value.capital.map((cap, id) => <li key={id}>{cap}</li>)}</h4>
      <h4>Area: {value.area}</h4>
      <h3>Languages:</h3>
      <ul>{Object.values(value.languages).map((lang, id)=><li key={id}>{lang}</li>)}</ul>
      <img src={value.flags.png} alt={value.flags.alt}/>
      <h4>Weather:</h4>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp} K</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : <p> Loading Weather Data</p>}
    </>
  )
}

export default App;
