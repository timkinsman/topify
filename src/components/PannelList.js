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
                    time_range: props.timeRange
                }
                })
                setData(response.data.items);
            })(props.token)
        }
    }, []);

    const renderTime = (timeRange) => {
        if(timeRange === "long_term"){
            return <h3 className="ui dividing header">All Time</h3>;
        }else if(timeRange === "medium_term"){
            return <h3 className="ui dividing header">6 Months</h3>;
        }else if(timeRange === "short_term"){
            return <h3 className="ui dividing header">4 Weeks</h3>
        }
    }

    const renderData = () => {
        return (
            <div className="ui comments">
                {renderTime(props.timeRange)}
                {data.map((data) =>
                    <div className="comment" key={data.id}>
                        <div className="avatar">
                            { props.type === "artists" && <img src={data.images[0].url} alt={data.name} style={{width: '35px', height: '35px', objectFit: 'cover'}} />}
                            {props.type === "tracks" && <img src={data.album.images[0].url} alt={data.name} />}
                        </div>
                        <div className="content">
                            <a className="author" href={data.external_urls.spotify} target="_blank" rel="noopener noreferrer">{data.name}</a>
                            <div className="text">
                                {props.type === "artists" && "-"}
                                {props.type === "tracks" && data.artists[0].name}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="column">
            {props.type === "artists" && renderData()}
            {props.type === "tracks" && renderData()}
        </div>
    )
}

export default PannelList;