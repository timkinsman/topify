import React, {useState, useEffect} from 'react';
import PannelList from './PannelList';
import spotify from '../apis/spotify';

const Pannel = props => {
    const [name, setName] = useState();
    const [imageURL, setImageURL] = useState();

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
                console.log(response.data)
                setName(response.data.items[0].name.toLowerCase());
                if(props.type === 'artists'){
                    setImageURL(response.data.items[0].images[0].url);
                }else if(props.type === 'tracks'){
                    setImageURL(response.data.items[0].album.images[0].url);
                }
            })(props.token)
        }
    }, []);

    return (
        <div style={{padding: '50px 0'}}>
            <div className="ui container">   
                <div className="ui grid">
                    <div className="four column row">
                        <div className="column">
                            <h3 className="ui dividing header">Top {props.type}</h3>
                            <img src={imageURL} alt={name} className="ui medium rounded image" />
                        </div>
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