import React from 'react';

import {authEndpoint, clientId, redirectUri, scopes} from "../config";

const TopifyWelcome = () => {
    const href = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&show_dialog=true&expires_in=3600`

    return (
        <div className='ui grid' style={{height: '100vh'}}>
            <div className='middle aligned column' style={{textAlign: 'center'}}>
                <h1>Topify.</h1>
                <a href={href}>Connect Spotify</a>
            </div>
        </div>
    )
}

export default TopifyWelcome;