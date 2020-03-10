import React, {useState, useEffect} from 'react';
import PannelList from './PannelList';
import spotify from '../apis/spotify';
import {isMobile} from 'react-device-detect';

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
                    time_range: 'long_term',
                    offset: 4
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
        <div style={{background: "rgb(238,174,202)", background: props.type==="artists" ? "pink" : "pink", padding: '50px 30px'}}>
            <div className="ui container">
                {props.type === "artists" && <img src={require('../assets/topartists.png')} className="ui large image" alt='topartists' />}
                {props.type === "tracks" && <img src={require('../assets/toptracks.png')} className="ui large image" alt='toptracks' />}
                <div className="ui stackable two column grid" style={{padding: '50px 0'}}>
                    <div className="column">
                        <img src={imageURL} alt={name} className="ui image" style={{border: 'solid'}} />
                    </div>
                    <div className="middle aligned column">
                        <h1 style={{fontSize: "-webkit-xxx-large", textTransform: 'uppercase', background: "rgba(255,255,255,0.15)", width: 'fit-content', padding: "10px"}}>{name}</h1>
                        <h3 style={{margin: "0 10px 0 0", padding: "10px", width: "fit-content", color: "white", background: "#1b1c1d", textTransform: 'capitalize'}}>{data}</h3>
                    </div>
                </div>
                <div className="ui stackable three column grid">
                    <div className="column">
                        <h1 className="ui header" style={{textAlign: isMobile ? 'center' : ''}}>All Time</h1>
                        <div style={{height: '500px', overflow: 'auto'}}>
                            <PannelList token={props.token} type={props.type} timeRange="long_term"/>
                            
                        </div>
                        <div style={{position: "relative", bottom: "4em", height: "4em", background: "-webkit-linear-gradient(rgb(255, 192, 203, 0) 0%, rgb(255, 192, 203, 1) 100%)"}}></div>
                    </div>
                    <div className="column">
                        <h1 className="ui header" style={{textAlign: isMobile ? 'center' : ''}}>6 Months</h1>
                        <div style={{height: '500px', overflow: 'auto'}}>
                            <PannelList token={props.token} type={props.type} timeRange="medium_term"/>
                        </div>
                        <div style={{position: "relative", bottom: "4em", height: "4em", background: "-webkit-linear-gradient(rgb(255, 192, 203, 0) 0%, rgb(255, 192, 203, 1) 100%)"}}></div>
                    </div>
                    <div className="column">
                        <h1 className="ui header" style={{textAlign: isMobile ? 'center' : ''}}>4 Weeks</h1>
                        <div style={{height: '500px', overflow: 'auto'}}>
                            <PannelList token={props.token} type={props.type} timeRange="short_term"/>
                        </div>
                        <div style={{position: "relative", bottom: "4em", height: "4em", background: "-webkit-linear-gradient(rgb(255, 192, 203, 0) 0%, rgb(255, 192, 203, 1) 100%)"}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pannel;