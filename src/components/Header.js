import React, {useState, useEffect} from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import spotify from '../apis/spotify';

const Header = props => {
    const [displayName, setDisplayName] = useState();
    const [URI, setURI] = useState();

    useEffect(() => {
        if(props.token){
            (async (token) => {
                const response = await spotify.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                setDisplayName(response.data.display_name);
                setURI(response.data.uri);
            })(props.token)
        }
    }, [props.token]);

    return (
        <div className="ui fixed inverted borderless menu">
            <div className="ui container">
                <div className="header item">
                    <img src={require('../assets/topify.png')} className="ui tiny image" alt='topify' />
                </div>
                <div className="right menu">
                    {!props.token && (
                        <a className="item" href={`${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join(
                            "%20"
                          )}&show_dialog=true&expires_in=3600`}>Log In</a>  
                    )}
                    {props.token && (
                        <React.Fragment>
                            <a className="item" href={URI} target="_blank" rel="noopener noreferrer">{displayName}</a>
                            <a className="item" onClick={props.onClickEvent} href="/">Log Out</a>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Header;