import React, {useState, useEffect} from 'react';
import PannelList from './PannelList';
import spotify from '../apis/spotify';

const Pannel = props => {
    const [name, setName] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        if(props.token){
            (async (token) => {
                const response = await spotify.get(`/me/top/${props.type}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    limit: 1,
                    time_range: 'long_term'
                }
                })
                setName(response.data.items[0].name);
                if(props.type === 'artists'){
                    setImageURL(response.data.items[0].images[0].url);
                }else if(props.type === 'tracks'){
                    setImageURL(response.data.items[0].album.images[0].url);
                }
            })(props.token)
        }
    }, []);

    return (
        <div style={{margin: '10px 0', background: props.background}}>
            <div className="ui container">
                <div className="ui grid">
                    {props.type === "artists" && (
                        <div className="two column row">
                            <div className="column">
                                <h4>
                                    {`Your #1 ${props.type.substring(0, props.type.length - 1)}!`.toUpperCase()}
                                </h4>
                                <h4>{name}</h4>
                            </div>
                            <div className="column">
                                <img src={imageURL} alt={name} />
                            </div>
                        </div>
                    )}
                    {props.type === "tracks" && (
                        <div className="two column row">
                            <div className="column">
                                <img src={imageURL} alt={name} />
                            </div>
                            <div className="column">
                                <h4>
                                    {`Your #1 ${props.type.substring(0, props.type.length - 1)}!`.toUpperCase()}
                                </h4>
                                <h4>{name}</h4>
                            </div>
                        </div>
                    )}
                    <div className="three column row">
                        <PannelList token={props.token} type={props.type} timeRange="long_term" />
                        <PannelList token={props.token} type={props.type} timeRange="medium_term" />
                        <PannelList token={props.token} type={props.type} timeRange="short_term" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pannel;