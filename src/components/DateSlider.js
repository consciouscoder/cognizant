import React from 'react';
import { Slider } from 'antd';

export default class DateSlider extends React.Component {

    handleChange = position => {
        let timeToSubtract = (366 - position) * 86400000; // 366 - One year + 1 day (to see weather exactly one year ago today)
        let timeMachineDate = new Date(Date.now() - timeToSubtract).getTime() / 1000;

        this.props.callbackParent(timeMachineDate.toFixed(0));
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