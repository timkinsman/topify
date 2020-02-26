import React from 'react';

const Header = () => {
    return (
        <div className="ui fixed inverted menu">
            <div className="ui container">
                <a className="header item">
                    Topify
                </a>
                <div className="right menu">
                    <a className="item">
                        Log In
                    </a>
                </div>
            </div>
        </div>
    )
};

export default Header