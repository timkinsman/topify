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
        <div style={{height: '101vh'}}>
            <div className="ui container">
                {!props.token && (
                    <p style={{alignSelf: 'center'}}>log in</p>
                )}
                {props.token && (
                    <p style={{alignSelf: 'center'}}>{displayName}</p>
                )}
            </div>
        </div>
    )
}

export default Cover;