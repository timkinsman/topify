import React from 'react';
import PannelList from './PannelList';

const Pannel = props => {
    return (
        <div className="ui container" style={{height: '100vh'}}>
            <h2>Top {props.type}</h2>
            <div className="ui grid">
                <div className="three column row">
                    <PannelList token={props.token} type={props.type} timeRange="long_term" />
                    <PannelList token={props.token} type={props.type} timeRange="medium_term" />
                    <PannelList token={props.token} type={props.type} timeRange="short_term" />
                </div>
            </div>
        </div>
    )
}

export default Pannel;