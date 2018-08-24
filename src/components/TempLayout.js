import React from 'react';
import PropTypes from 'prop-types';
import { StatefulToolTip } from 'react-portal-tooltip';

// TempLayout - Functional Component (stateless) -- Formats the layout of current temperature, high and low temperature and summary.

const TempLayout = props => {

    const { temperature, tempHigh, tempLow, tempHighTime, tempLowTime, summary,
        precipProbability, precipType, humidity, uvIndex } = props;

    let styleToolTip = {
        style: {
          background: 'rgba(51,51,51,.9)',
          color: '#FFFFFF',
          padding: 10,
          boxShadow: '3px 3px 1px rgba(0,0,0,.5)'
        },
        arrowStyle: {
          color: 'rgba(51,51,51,.9)',
          borderColor: false
        }
      };

      const temperatureDisplay = <div>{temperature}°F</div>;
      const tempHighDisplay = <div>{tempHigh}</div>;
      const tempLowDisplay = <div>{tempLow}</div>;

    return (
        <div>
            <div className="tempLayout">
                <StatefulToolTip parent={ temperatureDisplay } position="top" arrow="center" tooltipTimeout={0} className="temp" style={styleToolTip}>
                    <div>{precipProbability}% chance of {precipType || "rain"}</div>
                    <div>{humidity}% humidity</div>
                    <div>UV Index: {uvIndex}</div>
                </StatefulToolTip>
                <div className="tempHighLowLayout">

                    <StatefulToolTip parent={ tempHighDisplay } className="tempHigh" style={styleToolTip} position="top" arrow="center" tooltipTimeout={0}>
                        High at {tempHighTime}
                    </StatefulToolTip>

                    <StatefulToolTip parent={ tempLowDisplay } className="tempLow" style={styleToolTip} position="bottom" arrow="center" tooltipTimeout={0}>
                        Low at {tempLowTime}
                    </StatefulToolTip>
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
