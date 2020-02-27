import React from 'react';

const Footer = () => {
    return (
        <div className="ui inverted vertical footer segment">
            <div className="ui center aligned container">
                <img src="/" className="ui centered mini image" alt='img' />
                <div className="ui horizontal inverted small divided link list">
                    <a className="item" href="https://github.com/timkinsman/topify" target="_blank">Source Code</a>
                    <a className="item" href="mailto:tkinsm@gmail.com">Contact</a>
                    <a className="item" href="https://developer.spotify.com/documentation/web-api/" target="_blank">API</a>
                    <a className="item" href="#">About</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;