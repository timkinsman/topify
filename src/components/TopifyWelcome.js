import React from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";

const TopifyWelcome = () => {
    return (
        <div className="ui centered grid" style={{height: '100vh'}}>
            <div className="middle aligned column">
                <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>Welcome to Topify.</h1>
                <a 
                    className="circular ui button" 
                    href={`${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join(
                                    "%20"
                                )}&show_dialog=true&expires_in=3600`}>
                    GET STARTED
                </a>          
            </div>
        </div>
    )
}

export default TopifyWelcome;