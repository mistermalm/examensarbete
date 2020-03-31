import React, { useEffect, useState } from 'react'
import axios from 'axios'

/** Components */
import DailyCard from './DailyCard'

const WeatherContainer = props => {
  const [state, setState] = useState({
    fullData: [],
    dailyData: []
  })
  const getWeather = async () => {
    const res = await axios.get(
      `api/weather/${props.location.lat}/${props.location.lon}`
    )
    const dailyData = res.data.list.filter(reading =>
      reading.dt_txt.includes(props.location.flightDate.substring(0, 10))
    )
    setState({
      fullData: res.data.list,
      dailyData: dailyData
    })
  }
  useEffect(() => {
    getWeather()
  }, [])

  const formatDailyCard = () => {
    return state.dailyData.map((reading, index) => (
      <div className='destination-row' key={index}>
        <DailyCard reading={reading} key={index} />
      </div>
    ))
  }

  const renderDate = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const propsDate = new Date(props.location.flightDate)

    if (propsDate.getDate() == today.getDate()) {
      return <h4>Idag</h4>
    }
    if (propsDate.getDate() == tomorrow.getDate()) {
      return <h4>Imorgon</h4>
    }
    return <h4>{props.location.flightDate.substring(0, 10)}</h4>
  }
  return (
    <div className='destination'>
      <h4>Destination: {props.location.city}</h4>
      <h4>Flight ID: {props.location.flightId}</h4>
      {renderDate()}
      <div className='destination-weather'>{formatDailyCard()}</div>
    </div>
  )
}

const style = {
  backgroundColor: 'cyan'
}

const width = {
  width: '250px'
}

const flexbox = {
  display: 'flex',
  backgroundColor: 'cadetblue',
  marginTop: '30px'
}

export default WeatherContainer
