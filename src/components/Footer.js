import React from 'react';

const Footer = () => {
    return (
        <div className="ui inverted vertical footer segment">
            <div className="ui center aligned container">
                <img src="/" className="ui centered mini image" alt='img' />
                <div className="ui horizontal inverted small divided link list">
                    <a className="item" href="#">Link1</a>
                    <a className="item" href="#">Link2</a>
                    <a className="item" href="#">Link3</a>
                    <a className="item" href="#">Link4</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;