import React from 'react';
import { Slider } from 'antd';

// DateSlider -- Class Component
//            -- renders Slider input component for the Time Machine
//
export default class DateSlider extends React.Component {

    // Slider component callback to handle which past date for the Time Machine
    handleChange = position => {                          // For calculating weather for the exact time in the past
        let timeToSubtract = (366 - position) * 86400000; // 60 seconds * 60 minutes * 24 hours * 1000 (ms)
        let timeMachineDate = new Date(Date.now() - timeToSubtract).getTime() / 1000;

        this.props.callbackParent(timeMachineDate.toFixed(0)); // return Time Machine date to parent via callback
    }

    formatter = value => {
        if (value === 366) {
            return 'Now.';
        } else {
            return `${366 - value} days ago.`;
        }
    }

    render() {
        return (
            <div className="sliderDiv">
                <Slider 
                    defaultValue={366}
                    onAfterChange={this.handleChange}
                    min={1}
                    max={366}
                    tipFormatter={this.formatter}
                />
            </div>
        )
    }
}