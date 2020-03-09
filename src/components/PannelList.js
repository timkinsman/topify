import React, {useState, useEffect} from 'react';
import spotify from '../apis/spotify';

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
                    limit: 10,
                    time_range: props.timeRange,
                    offset: props.offset
                }
                })
                setData(response.data.items);
            })(props.token)
        }
    }, []);

    const toTitleCase = (text) => {
        return text ? text.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').replace("R&b", "R&B") : "-";
    }

    const renderData = () => {
        return (
            <div className="ui comments">
                {data.map((data) =>
                    <div className="comment" key={data.id}>
                        <div className="avatar">
                            {props.type === "artists" && <img src={data.images[0].url} alt={data.name} style={{width: '35px', height: '35px', objectFit: 'cover'}} />}
                            {props.type === "tracks" && <img src={data.album.images[0].url} alt={data.name} />}
                        </div>
                        <div className="content">
                            <a className="author" href={data.external_urls.spotify} target="_blank" rel="noopener noreferrer">{data.name}</a>
                            <div className="text">
                                {props.type === "artists" ? toTitleCase(data.genres[0]) : data.artists[0].name}
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