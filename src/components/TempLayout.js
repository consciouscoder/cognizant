import React from 'react';

export default class TempLayout extends React.Component {


    render() {
        return (
            <div>
                <div className="tempLayout">
                <div className="temp">{this.props.temperature}°F</div>
                    <div className="tempHighLowLayout">
                        <div className="tempHigh">{this.props.tempHigh}</div>
                        <div className="tempLow">{this.props.tempLow}</div>
                    </div>
                </div>
                <div className="summary">{this.props.summary}</div>
            </div>
        )
    }
}