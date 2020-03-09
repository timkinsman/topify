import React, {useEffect, useState} from 'react';
import spotify from '../apis/spotify'

const Cover = props => {
    const [displayName, setDisplayName] = useState();

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
    }, [props.token]);

    return (
        <div style={{background: 'rgb(27, 28, 29)'}}>
            <div className="ui container">
                <div className="ui stackable two column grid" style={{height: '100vh', margin: '0'}}>
                    <div className="middle aligned column">
                        {displayName && (
                            <div>
                                <h1 style={{fontSize: "-webkit-xxx-large", color: 'white'}}>Welcome, {displayName}...</h1>
                                <h1 style={{color: "#1DB954"}}>Your top tracks and artists.</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cover;