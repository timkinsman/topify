import React, {useState, useEffect} from 'react';
import spotify from '../apis/spotify';
import {isMobile} from 'react-device-detect';

const PannelList = props => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if(props.token){
            (async (token) => {
                const response = await spotify.get(`/me/top/${props.type}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    limit: 5,
                    time_range: props.timeRange
                }
                })
                setData(response.data.items);
            })(props.token)
        }
    }, []);
    
    const onItemClick = location => {
        window.open(location, "_blank");
    }

    const renderData = () => {
            return (
                <div className="ui link items" style={{textAlign: isMobile ? '-webkit-center' : ''}}>
                    {data.map((data) =>
                        <div className="item" onClick={() => {onItemClick(data.external_urls.spotify)}} key={data.id} style={{background: "rgba(255, 255, 255, 0.15)", width: isMobile ? 'fit-content' : ''}}>
                            <div className="ui tiny image">
                                {props.type === "artists" && <img src={data.images[0].url} alt={data.name} style={{objectFit: 'cover', height: isMobile ? '250px' : '80px', width: isMobile ? '250px' : '80px'}} />}
                                {props.type === "tracks" && <img src={data.album.images[0].url} alt={data.name} />}
                            </div>
                            <div className="middle aligned content" style={{textAlign: isMobile ? 'center' : '', paddingBottom: isMobile ? '21px' : ''}}>
                                <a className="header">{data.name}</a>
                                <div className="description" style={{textTransform: 'capitalize'}}>
                                    {props.type === "artists" ? (data.genres[0] ? data.genres[0] : "-") : data.artists[0].name}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
    }

    return (
        <div>
            {props.type === "artists" && renderData()}
            {props.type === "tracks" && renderData()}
        </div>
    )
}

export default PannelList;