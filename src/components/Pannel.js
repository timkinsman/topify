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
        <div style={{background: "rgb(238,174,202)", background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)", padding: '50px'}}>
            <div className="ui container">   
                <h1 className="ui header">
                    Top {props.type.replace(/^\w/, c => c.toUpperCase())}
                </h1>
                <h1 className="ui header">All Time // button</h1>
                <div className="ui stackable three column grid">
                    <div className="column">
                        <img src={imageURL} alt={name} className="ui medium rounded image" />
                        <p>some deets</p>
                    </div>
                    <div className="column">
                        <PannelList token={props.token} type={props.type} timeRange="long_term" offset="0" />
                    </div>
                    <div className="column">
                        <PannelList token={props.token} type={props.type} timeRange="long_term" offset="10" />
                    </div>
                </div>
                <div className="ui stackable two column grid">
                    <div className="column">
                        <h1 className="ui header">6 Months // button</h1>
                        <PannelList token={props.token} type={props.type} timeRange="medium_term" offset="0" />
                    </div>
                    <div className="column">
                        <h1 className="ui header">4 Weeks // button</h1>
                        <PannelList token={props.token} type={props.type} timeRange="short_term" offset="0" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pannel;