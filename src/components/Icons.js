import React from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';

// Icons -- Class Component
//       -- renders the Skycon icon based on the daily forecast for specified date
//
export default class Icons extends React.Component {

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

    render() {
        return (
          <Skycons
            color="white"
            icon={this.getIcon(this.props.skyIcon)}
            autoplay={true}
          />
        );
    }
}

Icons.propTypes = {
    skyIcon: PropTypes.string
};
