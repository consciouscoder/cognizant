import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

// TempLayout - Functional Component (stateless) -- Formats the layout of current temperature, high and low temperature and summary.

const TempLayout = props => {

    const { temperature, tempHigh, tempLow, tempHighTime, tempLowTime, summary,
            precipProbability, precipType, humidity, uvIndex
    } = props;

    return (
        <div>
            <div className="tempLayout">
                <div data-tip data-for="temperature" className="temp">
                    {temperature}°F
                </div>
            <ReactTooltip type="info" id="temperature">
                <div>{precipProbability}% chance of {precipType || "rain"}</div>
                <div>{humidity}% humidity</div>
                <div>UV Index: {uvIndex}</div>
            </ReactTooltip>
                <div className="tempHighLowLayout">
                    <a data-tip data-for="tempHigh">
                        <div className="tempHigh">{tempHigh}</div>
                    </a>
                    <ReactTooltip type="info" id="tempHigh">
                        High at {tempHighTime}
                    </ReactTooltip>
                    <a data-tip data-for="tempLow">
                        <div className="tempLow">{tempLow}</div>
                    </a>
                    <ReactTooltip type="info" place="bottom" id="tempLow">
                        Low at {tempLowTime}
                    </ReactTooltip>
                </div>
            </div>
            <div className="summary">{summary}</div>
        </div>
    );
};

export default TempLayout;

TempLayout.propTypes = {
    temperature: PropTypes.number,
    tempHigh: PropTypes.number,
    tempLow: PropTypes.number,
    tempHighTime: PropTypes.string,
    tempLowTime: PropTypes.string,
    precipProbability: PropTypes.number,
    precipType: PropTypes.string,
    humidity: PropTypes.number,
    uvIndex: PropTypes.number,
    summary: PropTypes.string
};
