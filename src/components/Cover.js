import React, {useState, useEffect} from 'react';
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
        <div className="ui container" style={{height: '100vh'}}>
            {!props.token && (
                <p>log in</p>
            )}
            {props.token && (
                <p>{displayName}</p>
            )}
        </div>
    )
}

export default Cover;