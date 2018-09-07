import React from 'react';
import PropTypes from 'prop-types';
import Icons from './Icons';
import TempLayout from './TempLayout';
import DateSlider from './DateSlider';
import axios from 'axios';
import './WeatherBlock.css';

// WeatherBlock -- Class Component
//              -- Reusable weather block component that takes optional props to display DarkSky API weather data
//              -- props: API_KEY - (string) API KEY for DarkSky API 
//                        latLong - (string) Latitude and longitude to retrieve the weather data for
//
export default class WeatherBlock extends React.Component {
  state = {
    dsDataCurrent: [],
    dsDataDaily: [],
    temperature: 0,
    tempHigh: 0,
    tempLow: 0,
    skyIcon: '',
    x: 366,
    timeMachineDate: new Date().toLocaleDateString('en-US'),
    backgroundColor: '#FF0000',
    summary: '',
    doneLoading: false
  }

  componentDidMount() {
    this.getDarkSkyAPI('');
  }

  // getDarkSkyAPI - Function to request data from the DarkSky API - param date is optional
  //               - with date param is for Time Machine - without date will default to current or weather forecast
  getDarkSkyAPI = date => {
        // 2f59170b5a75d855ff4dbbcfa4c498e0 -- dan@ladendorf.io -- API key
        // 0c7f10d0d5fa0d8602b3c9664767e7f7 -- dladendorf@gmail.com -- backup API key
        // http://cors-anywhere.dan.earth:8080/ -- main CORS proxy
        // https://cors-anywhere.herokuapp.com/ -- backup CORS proxy
        const CORS = 'http://cors-anywhere.dan.earth:8080/';
        const API_URL = 'https://api.darksky.net/forecast/';
        const API_KEY = this.props.API_KEY || '0c7f10d0d5fa0d8602b3c9664767e7f7'; // Get from props or default to API_KEY
        const cognizantLatLong = this.props.latLong || '40.016457,-105.285884';   // Get from props or default to Cognizant latLong
        const excludeBlocks = '?exclude=minutely,hourly,alerts,flags'; // exclude these sections from JSON response
        
        if (date) {
          date = `,${date}`;
        }
   
        const forecastDay = this.props.forecastDay;
        // Example of Dark Sky API query:
        // http://cors-anywhere.dan.earth:8080/https://api.darksky.net/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/40.016457,-105.285884,1532992316?exclude=minutely,hourly,alerts,flags
        
        // Build the HTTP GET request query string
        axios.get(`${CORS}${API_URL}${API_KEY}/${cognizantLatLong}${date}${excludeBlocks}`)
            .then(response => { 
                console.log(response);
                const dsData = response.data;

                if (forecastDay) { // 3 or 7-Day Forecast
                    this.setState({ 
                        skyIcon: dsData.daily.data[forecastDay].icon,
                        summary: dsData.daily.data[forecastDay].summary.substring(0, 39),
                        temperature: Math.round(dsData.daily.data[forecastDay].temperatureHigh),
                        tempHigh: Math.round(dsData.daily.data[forecastDay].temperatureHigh),
                        tempLow: Math.round(dsData.daily.data[forecastDay].temperatureLow),
                        tempHighTime: this.toTextTimeHours(dsData.daily.data[forecastDay].apparentTemperatureHighTime),
                        tempLowTime: this.toTextTimeHours(dsData.daily.data[forecastDay].apparentTemperatureLowTime),
                        precipProbability: Math.round(dsData.daily.data[forecastDay].precipProbability * 100),
                        precipType: dsData.daily.data[forecastDay].precipType,
                        humidity: Math.round(dsData.daily.data[forecastDay].humidity * 200),
                        uvIndex: dsData.daily.data[forecastDay].uvIndex,
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
                        tempHighTime: this.toTextTimeHours(dsData.daily.data[0].temperatureHighTime),
                        tempLowTime: this.toTextTimeHours(dsData.daily.data[0].temperatureLowTime),
                        precipProbability: Math.round(dsData.daily.data[0].precipProbability * 100),
                        precipType: dsData.daily.data[0].precipType,
                        humidity: Math.round(dsData.daily.data[0].humidity * 100),
                        uvIndex: dsData.daily.data[0].uvIndex,
                        doneLoading: true,
                        backgroundColor: this.getColor(Math.round(dsData.currently.temperature))
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
            });
    }

  // Set background color based on temperature
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

  // Convert UNIX time to local time string with day of week
  toTextTime = unixTime => {
    const textTime = new Date(unixTime * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return `${textTime.toLocaleDateString('en-US')} - ${days[textTime.getDay()]}`;
  }

  // Convert UNIX time to local time string
  toTextTimeHours = unixTime => {
    const textTime = new Date(unixTime * 1000);
    return `${textTime.toLocaleTimeString('en-US')}`;
  }

  // Request new DarkSky API for Time Machine based on new date
  getTimeMachine = date => {
    this.setState({ timeMachineDate: this.toTextTime(date) });
    this.getDarkSkyAPI(date);
  }

  render() {
    
    const { temperature, tempHigh, tempLow, tempHighTime, tempLowTime, summary, skyIcon, timeMachineDate, doneLoading,
            precipProbability, precipType, humidity, uvIndex } = this.state;

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
                                tempHighTime={tempHighTime}
                                tempLowTime={tempLowTime}
                                precipProbability={precipProbability}
                                precipType={precipType}
                                humidity={humidity}
                                uvIndex={uvIndex}
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
