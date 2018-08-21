import React from 'react';

// TempLayout - Functional Component (stateless) -- Formats the layout of current temperature, high and low temperature and summary.

const TempLayout = props => {

    const { temperature, tempHigh, tempLow, summary } = props;

    return (
        <div>
        <div className="tempLayout">
        <div className="temp">{temperature}°F</div>
            <div className="tempHighLowLayout">
                <div className="tempHigh">{tempHigh}</div>
                <div className="tempLow">{tempLow}</div>
            </div>
        </div>
        <div className="summary">{summary}</div>
        </div>
    );
};

export default TempLayout;