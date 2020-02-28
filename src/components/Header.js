import React from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";

const Header = props => {
    return (
        <div className="ui fixed inverted menu">
            <div className="ui container">
                <img src="/" className="item" alt='img' />
                <div className="right menu">
                    {!props.token && (
                        <a className="item" href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                            "%20"
                          )}&response_type=token&show_dialog=true`}>Log In</a>  
                    )}
                    {props.token && (
                        <a className="item" onClick={props.onClickEvent}>Log Out</a>  
                    )}
                </div>
            </div>
        </div>
    )
};

export default Header;