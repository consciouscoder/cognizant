import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Skycons from 'react-skycons';
import { Slider } from 'antd';

class App extends Component {
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
    showSlider: false
  }

  constructor() {
      super();
  }

  componentDidMount() {
    // https://cors-anywhere.herokuapp.com/ 
    // 2f59170b5a75d855ff4dbbcfa4c498e0 -- dan@ladendorf.io
    // 0c7f10d0d5fa0d8602b3c9664767e7f7 -- dladendorf@gmail.com
    axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2f59170b5a75d855ff4dbbcfa4c498e0/40.016457,-105.285884')
         .then(response => { 
            //console.log(response);
            const dsData = response.data;
            const summary = dsData.currently.summary;
            const temperature = Math.round(dsData.currently.temperature);
            const tempHigh = Math.round(dsData.daily.data[0].temperatureHigh);
            const tempLow = Math.round(dsData.daily.data[0].temperatureLow);
            const skyIcon = this.getIcon(dsData.currently.icon);
            this.setState({ skyIcon, summary, temperature, tempHigh, tempLow, showSlider: true });
            this.setState({ backgroundColor: this.getColor(temperature) });
          })
          .catch(err => {
            console.log(err.message);
          });
  }

  getIcon = icon => {
    switch (icon) {
    case 'clear-day':
      return 'CLEAR_DAY';
    case 'clear-night':
      return 'CLEAR_NIGHT';
    case 'rain':
      return 'RAIN';
    case 'snow':
      return 'SNOW';
    case 'sleet':
      return 'SLEET';
    case 'wind':
      return 'WIND';
    case 'fog':
      return 'FOG';
    case 'cloudy':
      return 'CLOUDY';
    case 'partly-cloudy-day':
      return 'PARTLY_CLOUDY_DAY';
    case 'partly-cloudy-night':
      return 'PARTLY_CLOUDY_NIGHT';
    default:
      return 'CLEAR_DAY';
    }
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

  getTimeMachine = date => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2f59170b5a75d855ff4dbbcfa4c498e0/40.016457,-105.285884,${date}`)
         .then(response => { 
            console.log(response);
            const dsData = response.data;
            const summary = dsData.currently.summary;
            const temperature = Math.round(dsData.currently.temperature);
            const tempHigh = Math.round(dsData.daily.data[0].temperatureHigh);
            const tempLow = Math.round(dsData.daily.data[0].temperatureLow);
            const skyIcon = this.getIcon(dsData.currently.icon);
            this.setState({ skyIcon, summary, temperature, tempHigh, tempLow, showSlider: true });
            this.setState({ backgroundColor: this.getColor(temperature) });
          })
          .catch(err => {
            console.log(err.message);
          });
  }

  toTextTime = unixTime => {
      return new Date(unixTime * 1000).toLocaleDateString('en-US');
  }

  handleChange = position => {

    let timeToSubtract = (366 - position) * 86400000; // 366 - One year + 1 day (to see weather exactly one year ago today)
    let timeMachineDate = new Date(Date.now() - timeToSubtract).getTime() / 1000;
    // var date = new Date(unix_timestamp*1000);
    
    this.getTimeMachine(timeMachineDate.toFixed(0));
    console.log(`date: ${new Date(timeMachineDate * 1000)} unix: ${timeMachineDate.toFixed(0)}`);
    //console.log(new Date(timeMachineDate.toFixed(0) * 1000));    

    this.setState({ timeMachineDate: this.toTextTime(timeMachineDate.toFixed(0)) });
  }

  formatter = value => {
    if (value === 366) {
      return `Now.`;
    } else {
      return `${366 - value} days ago.`;
    }
  }

  render() {

    let bgColorStyle = {
        backgroundColor: this.state.backgroundColor
    };
    
    const { temperature, tempHigh, tempLow, summary, skyIcon, timeMachineDate, showSlider } = this.state;

    return (


        <div style={bgColorStyle} className="centerDiv">
            <div className="skyDiv">
                <Skycons
                    color="white"
                    icon={skyIcon}
                    autoplay={true}
                />
                <div>
                    <div className="tempLayout">
                    <div className="temp">{temperature}°F</div>
                    <div className="tempHighLowLayout">
                        <div className="tempHigh">{tempHigh}</div>
                        <div className="tempLow">{tempLow}</div>
                    </div>
                    </div>
                    <div className="summary">{summary}</div>
                </div>
            </div>
        
            <div style={showSlider ? {} : { display: 'none' }}>
                <div>
                    
                    <div className="sliderDiv">
                        <Slider 
                            defaultValue={366}
                            onAfterChange={this.handleChange}
                            min={1}
                            max={366}
                            tipFormatter={this.formatter}
                        />
                    </div>
                    <div className="dateDiv">{`${timeMachineDate}`}</div>
                </div>
            </div>
    </div>

    );
  }
}

export default App;
