import React, { Component } from 'react';
import Icons from './components/Icons';
import TempLayout from './components/TempLayout';
import DateSlider from './components/DateSlider';
import './App.css';
import axios from 'axios';

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
    doneLoading: false
  }

  constructor() {
      super();
  }

  componentDidMount() {
    this.getDarkSkyAPI();
  }

  getDarkSkyAPI = date => {
        // 2f59170b5a75d855ff4dbbcfa4c498e0 -- dan@ladendorf.io
        // 0c7f10d0d5fa0d8602b3c9664767e7f7 -- dladendorf@gmail.com
        const CORS = 'https://cors-anywhere.herokuapp.com/';
        const API_URL = 'https://api.darksky.net/forecast/';
        const API_KEY = '2f59170b5a75d855ff4dbbcfa4c498e0';
        const cognizantLatLong = '40.016457,-105.285884';
        const excludeBlocks = '?exclude=minutely,hourly,alerts,flags';
        
        if (date) {
          date = `,${date}`;
        } else {
          date = '';
        }

        //https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2f59170b5a75d855ff4dbbcfa4c498e0/40.016457,-105.285884?exclude=minutely,hourly,alerts,flags
        
        axios.get(`${CORS}${API_URL}${API_KEY}/${cognizantLatLong}${date}${excludeBlocks}`)
            .then(response => { 
                console.log(response);
                const dsData = response.data;
                const summary = dsData.currently.summary;
                const temperature = Math.round(dsData.currently.temperature);
                const tempHigh = Math.round(dsData.daily.data[0].temperatureHigh);
                const tempLow = Math.round(dsData.daily.data[0].temperatureLow);
                const skyIcon = dsData.currently.icon;
                this.setState({ skyIcon, summary, temperature, tempHigh, tempLow, doneLoading: true });
                this.setState({ backgroundColor: this.getColor(temperature) });
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
    return new Date(unixTime * 1000).toLocaleDateString('en-US');
  }

  getTimeMachine = date => {
    this.setState({ timeMachineDate: this.toTextTime(date) });
    this.getDarkSkyAPI(date);
  }

  render() {

    let bgColorStyle = {
        backgroundColor: this.state.backgroundColor
    };
    
    const { temperature, tempHigh, tempLow, summary, skyIcon, timeMachineDate, doneLoading } = this.state;

    return (

        <div style={bgColorStyle} className="centerDiv">
            <div className="skyDiv" style={doneLoading ? {} : { display: 'none' }}>
                <Icons skyIcon={skyIcon} />
                <TempLayout temperature={temperature}
                            tempHigh={tempHigh}
                            tempLow={tempLow}
                            summary={summary}    
                />
            </div>
        
            <div style={doneLoading ? {} : { display: 'none' }}>
                <div>
                    <DateSlider callbackParent={date => this.getTimeMachine(date)} />
                    <div className="dateDiv">
                        {`${timeMachineDate}`}
                    </div>
                </div>
            </div>
        </div>

    );
  }
}

export default App;
