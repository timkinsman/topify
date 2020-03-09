import React, {useState, useEffect} from 'react';
import PannelList from './PannelList';
import spotify from '../apis/spotify';

const Pannel = props => {
    const [name, setName] = useState();
    const [imageURL, setImageURL] = useState();
    const [data, setData] = useState();

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
                    setData(response.data.items[0].genres[0])
                }else if(props.type === 'tracks'){
                    setImageURL(response.data.items[0].album.images[0].url);
                    setData(response.data.items[0].artists[0].name)
                }
            })(props.token)
        }
    }, []);

    return (
        <div style={{background: "rgb(238,174,202)", background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)", padding: '100px'}}>
            <div className="ui container">   
                <h1 className="ui header">
                    Top {props.type.replace(/^\w/, c => c.toUpperCase())}
                </h1>
                <div className="ui stackable two column grid" style={{padding: '50px 0'}}>
                    <div className="column">
                        <img src={imageURL} alt={name} className="ui image" style={{boxShadow: '-10px 10px'}} />
                    </div>
                    <div className="middle aligned column">
                        <h1 style={{fontSize: "-webkit-xxx-large", textTransform: 'uppercase', background: "rgba(255,255,255,0.15)", width: 'fit-content', padding: "10px"}}>{name}</h1>
                        <h3 style={{margin: "0", padding: "10px", width: "fit-content", color: "white", background: "#1b1c1d", textTransform: 'capitalize'}}>{data}</h3>
                    </div>
                </div>
                <div className="ui stackable three column grid">
                    <div className="column">
                        <h1 className="ui header">All Time</h1>
                        <PannelList token={props.token} type={props.type} timeRange="long_term"/>
                    </div>
                    <div className="column">
                        <h1 className="ui header">6 Months</h1>
                        <PannelList token={props.token} type={props.type} timeRange="medium_term"/>
                    </div>
                    <div className="column">
                        <h1 className="ui header">4 Weeks</h1>
                        <PannelList token={props.token} type={props.type} timeRange="short_term"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pannel;