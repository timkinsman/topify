import React from 'react';

const Footer = () => {
    return (
        <div className="ui inverted vertical footer segment">
            <div className="ui center aligned container">
                <img src="/" className="ui centered mini image" alt='img' />
                <div className="ui horizontal inverted small divided link list">
                    <a className="item" href="https://github.com/timkinsman/topify" target="_blank" rel="noopener noreferrer">github</a>
                    <a className="item" href="mailto:tkinsm@gmail.com">contact</a>
                    <a className="item" href="https://developer.spotify.com/documentation/web-api/" target="_blank" rel="noopener noreferrer">api</a>
                    <a className="item" href="https://www.linkedin.com/in/timothykinsman/" target="_blank" rel="noopener noreferrer">linkedin</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;