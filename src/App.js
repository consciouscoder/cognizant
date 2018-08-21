import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import WeatherBlock from './components/WeatherBlock';
import './App.css';

class App extends Component {

render() {

    const TimeMachine = () => {
        return (
            <div>
                <div className="divTimeMachine">TIME MACHINE</div>
                <div className="divSpace">
                    <WeatherBlock />
                </div>
            </div>
        );
    };
    
    const ThreeDayForecast = () => {
        return (
            <div>
                <div className="divThreeDay">3-DAY FORECAST</div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={1} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={2} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={3} />
                </div>
            </div>
        );
    };
    
    const SevenDayForecast = () => {
        return (
            <div>
                <div className="divSevenDay">7-DAY FORECAST</div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={1} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={2} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={3} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={4} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={5} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={6} />
                </div>
                <div className="divSpace">
                    <WeatherBlock forecastDay={7} />
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
