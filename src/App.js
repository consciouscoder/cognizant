import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Skycons from 'react-skycons'

class App extends Component {
  state = {
    darkSkyData: [],
    skyIcon: ''
  }

  componentDidMount() {
    // https://cors-anywhere.herokuapp.com/ 
    axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/0c7f10d0d5fa0d8602b3c9664767e7f7/40.016457,-105.285884').then(res => { 
      console.log(res);
      const darkSkyData = res.data.currently;
      const skyIcon = this.getIcon(darkSkyData.icon);
      this.setState({ darkSkyData, skyIcon });
      console.log(darkSkyData);
      console.log(skyIcon);
    });
  }

  getIcon(icon) {
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

  render() {
    return (

      <div className="centerDiv">
        Current Temp: {this.state.darkSkyData.temperature}
        <div>
          <Skycons 
            color='white' 
            icon={this.state.skyIcon}
            autoplay={false}
          />
        </div>
      </div>

    );
  }
}

export default App;
