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

    const renderArtists = () => {
        return (
            <div className="ui comments">
                {renderTime(props.timeRange)}
                {data.map((data) =>
                    <div className="comment" key={data.id}>
                        <div className="avatar">
                            <img src={data.images[0].url} alt={data.name} />
                        </div>
                        <div className="content">
                            <a className="author" href={data.external_urls.spotify} target="_blank">{data.name}</a>
                            <div className="text">
                                -
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const renderTracks = () => {
        return (
            <div className="ui comments">
                {renderTime(props.timeRange)}
                {data.map((data) =>
                    <div className="comment" key={data.id}>
                        <div className="avatar">
                            <img src={data.album.images[0].url} alt={data.name} />
                        </div>
                        <div className="content">
                            <a className="author" href={data.external_urls.spotify} target="_blank">{data.name}</a>
                            <div className="text">
                                {data.artists[0].name}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="column">
            {props.type === "artists" && renderArtists()}
            {props.type === "tracks" && renderTracks()}
        </div>
    )
}

export default PannelList;