import React, {useState, useEffect} from 'react';
import './Cover.css'
import spotify from '../apis/spotify';

const Cover = props => {
    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        if(props.token){
            (async (token) => {
                const response = await spotify.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                })
                setDisplayName(response.data.display_name);

            })(props.token)
        }
    }, []);

    return (
        <div className="ui main text container cover">
            {!props.token && (
                <h1 className="ui header text">EXPLORE YOUR TOP PICKS!</h1>
            )}
            {props.token && (
                <div className="text">
                    <h1 className="ui header">WELCOME TO YOUR TOP PICKS!</h1>
                    <h3>{displayName}</h3>
                </div>
            )}
        </div>
    )
}

export default Cover;