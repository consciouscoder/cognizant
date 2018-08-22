import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import WeatherBlock from './components/WeatherBlock';
import './App.css';

class App extends Component {

render() {

    const latLong = '40.016457,-105.285884';
    const API_KEY = '0c7f10d0d5fa0d8602b3c9664767e7f7';

    const TimeMachine = () => {
        return (
            <div>
                <div className="divTimeMachine">TIME MACHINE</div>
                <div className="divSpace">
                    <WeatherBlock API_KEY={API_KEY} latLong={latLong} />
                </div>
            </div>
        );
    };
    
    const ThreeDayForecast = () => {
        return (
            <div>
                <div className="divThreeDay">3-DAY FORECAST</div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={1} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={2} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={3} API_KEY={API_KEY} latLong={latLong} />
                </div>
            </div>
        );
    };
    
    const SevenDayForecast = () => {
        return (
            <div>
                <div className="divSevenDay">7-DAY FORECAST</div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={1} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={2} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={3} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={4} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={5} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={6} API_KEY={API_KEY} latLong={latLong} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={7} API_KEY={API_KEY} latLong={latLong} />
                </div>
            </div>
        );
    };

    return (
        <BrowserRouter>
            <div>
                <div className="linksDiv">
                    <Link to="/">Time Machine</Link> |
                    <Link to="/3day"> 3-Day</Link> |
                    <Link to="/7day"> 7-Day</Link>

                    <Route exact path="/" component={TimeMachine} />
                    <Route path="/3day" component={ThreeDayForecast} />
                    <Route path="/7day" component={SevenDayForecast} />
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
