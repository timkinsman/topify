import React from 'react';
import './Cover.css'

const Cover = props => {
    return (
        <div className="ui main text container cover">
            {!props.token && (
                <h1 className="ui header text">EXPLORE YOUR TOP PICKS!</h1>
            )}
            {props.token && (
                <div className="text">
                    <h1 className="ui header">WELCOME TO YOUR TOP PICKS!</h1>
                    <h3>USERNAME</h3>
                </div>
            )}
        </div>
    )
}

export default Cover;