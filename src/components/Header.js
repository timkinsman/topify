import React, {useState, useEffect} from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import spotify from '../apis/spotify';

const Header = props => {
    const [displayName, setDisplayName] = useState();
    const [externalUrls, setExternalUrls] = useState();

    useEffect(() => {
        if(props.token){
            (async (token) => {
                const response = await spotify.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                setDisplayName(response.data.display_name);
                setExternalUrls(response.data.external_urls.spotify);
            })(props.token)
        }
    });

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
                        <React.Fragment>
                            <a className="item" href={externalUrls} target="_blank" rel="noopener noreferrer">{displayName}</a>
                            <a className="item" onClick={props.onClickEvent} href="/">Log Out</a>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Header;