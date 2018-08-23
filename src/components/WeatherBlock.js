import React from 'react';
import PropTypes from 'prop-types';
import Icons from './Icons';
import TempLayout from './TempLayout';
import DateSlider from './DateSlider';
import './WeatherBlock.css';
import axios from 'axios';

export default class WeatherBlock extends React.Component {
  state = {
    dsDataCurrent: [],
    dsDataDaily: [],
    temperature: 0,
    tempHigh: 0,
    tempLow: 0,
    skyIcon: 'PARTLY_CLOUDY_DAY',
    x: 366,
    timeMachineDate: new Date().toLocaleDateString('en-US'),
    backgroundColor: '#FF0000',
    summary: '',
    doneLoading: false
  }

  componentDidMount() {
    this.getDarkSkyAPI('');
  }

  getDarkSkyAPI = date => {
        // 2f59170b5a75d855ff4dbbcfa4c498e0 -- dan@ladendorf.io
        // 0c7f10d0d5fa0d8602b3c9664767e7f7 -- dladendorf@gmail.com -- backup API key
        // http://cors-anywhere.dan.earth:8080/ -- main CORS proxy
        // https://cors-anywhere.herokuapp.com/ -- backup CORS proxy
        const CORS = 'http://cors-anywhere.dan.earth:8080/';
        const API_URL = 'https://api.darksky.net/forecast/';
        const API_KEY = this.props.API_KEY || '0c7f10d0d5fa0d8602b3c9664767e7f7'; // Get from props or default to 
        const cognizantLatLong = this.props.latLong || '40.016457,-105.285884';   // Get from props or default to Cognizant latLong
        const excludeBlocks = '?exclude=minutely,hourly,alerts,flags'; // exclude these sections from JSON response
        
        if (date) {
          date = `,${date}`;
        }
   
        const forecastDay = this.props.forecastDay;
        // Example Dark Sky API Query:
        // https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2f59170b5a75d855ff4dbbcfa4c498e0/40.016457,-105.285884?exclude=minutely,hourly,alerts,flags
        
        axios.get(`${CORS}${API_URL}${API_KEY}/${cognizantLatLong}${date}${excludeBlocks}`)
            .then(response => { 
                console.log(response);
                const dsData = response.data;

                if (forecastDay) { // 3 or 7-Day Forecast
                    this.setState({ 
                        skyIcon: dsData.daily.data[forecastDay].icon,
                        summary: dsData.daily.data[forecastDay].summary, 
                        temperature: Math.round(dsData.daily.data[forecastDay].temperatureHigh),
                        tempHigh: Math.round(dsData.daily.data[forecastDay].temperatureHigh),
                        tempLow: Math.round(dsData.daily.data[forecastDay].temperatureLow),
                        doneLoading: true, 
                        timeMachineDate: this.toTextTime(dsData.daily.data[forecastDay].time),
                        backgroundColor: this.getColor(Math.round(dsData.daily.data[forecastDay].temperatureHigh))
                    });
                } else { // Time Machine
                    this.setState({ 
                        skyIcon: dsData.currently.icon,
                        summary: dsData.currently.summary,
                        temperature: Math.round(dsData.currently.temperature),
                        tempHigh: Math.round(dsData.daily.data[0].temperatureHigh),
                        tempLow: Math.round(dsData.daily.data[0].temperatureLow),
                        doneLoading: true,
                        backgroundColor: this.getColor(Math.round(dsData.currently.temperature))
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    }

  getColor = tempCurrent => {

      if (tempCurrent >= 90) {
          return '#FF0000';
      } else if (tempCurrent >= 80 && tempCurrent <= 89) {
          return '#FF5000';
      } else if (tempCurrent >= 70 && tempCurrent <= 79) {
          return '#FF8c00';
      } else if (tempCurrent >= 60 && tempCurrent <= 69) {
          return '#FFc800';
      } else if (tempCurrent >= 50 && tempCurrent <= 59) {
          return '#FFe600';
      } else if (tempCurrent >= 40 && tempCurrent <= 49) {
          return '#00d4ff';
      } else if (tempCurrent >= 30 && tempCurrent <= 39) {
          return '#0084ff';
      } else if (tempCurrent < 29) {
          return '#0500ff';
      } else {
          return '#FF8c00';
      }
  }

  toTextTime = unixTime => {
    const textTime = new Date(unixTime * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${textTime.toLocaleDateString('en-US')} - ${days[textTime.getDay()]}`;
  }

  getTimeMachine = date => {
    this.setState({ timeMachineDate: this.toTextTime(date) });
    this.getDarkSkyAPI(date);
  }

  render() {
    
    const { temperature, tempHigh, tempLow, summary, skyIcon, timeMachineDate, doneLoading } = this.state;

    let bgColorStyle = {
        backgroundColor: this.state.backgroundColor
    };

    let slider;

    if (!this.props.forecastDay) { 
        slider = <DateSlider callbackParent={date => this.getTimeMachine(date)} />;
    }

    return (

        <div style={bgColorStyle} className="centerDiv">
            <div className="skyDiv">
                <Icons skyIcon={skyIcon} />
                    <TempLayout temperature={temperature}
                                tempHigh={tempHigh}
                                tempLow={tempLow}
                                summary={summary}    
                    />
            </div>
            <div style={doneLoading ? {} : { display: 'none' }}>
                <div>
                    {slider}
                    <div className="dateDiv">
                        {`${timeMachineDate}`}
                    </div>
                </div>
            </div>
        </div>

    );
  }
}

WeatherBlock.propTypes = {
    forecastDay: PropTypes.number,
    latLong: PropTypes.string,
    API_KEY: PropTypes.string
};
