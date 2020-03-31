import React, { useEffect } from 'react'
import Moment from 'react-moment'

export const DailyCard = reading => {
  const hours = new Date(reading.reading.dt_txt)
  const temp = reading.reading.main.temp
  const desc = reading.reading.weather[0].description
  const icon = reading.reading.weather[0].icon
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div>
      <ul style={flex}>
        <li>
          <Moment format='HH:mm'>{hours}</Moment>
        </li>
        <li>
          <img style={size} src={iconURL} alt='' />
        </li>
        <li>{desc}</li>
        <li>{parseInt(temp)} C&deg;</li>
        <li></li>
      </ul>
    </div>
  )
}
const viewWidth = {
  width: '100vw'
}
const flex = {
  display: 'flex'
}
const column = {
  flexDirection: 'row'
}

const size = {
  width: '64px'
}

export default DailyCard
