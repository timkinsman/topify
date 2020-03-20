import React, {useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import TopifyMe from './TopifyMe';
import TopifyArtists from './TopifyArtists'
import TopifyTracks from './TopifyTracks';
import TopifyTop from './ToptifyTop';
import TopifyPlaylist from './TopifyPlaylist';

const TopifyShow = ({token, onClickEvent}) => {
    const [me, setMe] = useState();
    const [myTopArtists, setMyTopArtists] = useState();
    const [myTopTracks, setMyTopTracks] = useState();

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    useEffect(() => {
        spotifyApi.getMe({}, function(err, data) {
            if (err) console.error(err);
            else setMe(data);
        })
        spotifyApi.getMyTopArtists({limit: '50', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopArtists(data.items);
        })
        spotifyApi.getMyTopTracks({limit: '5', time_range: 'short_term'}, function(err, data) {
            if (err) console.error(err);
            else {
                spotifyApi.getRecommendations({seed_tracks: data.items.splice(0, 5).map(e => e.id)}, function(err, data) {
                    if (err) console.error(err)
                    else {
                        console.log("seeds", data.seeds)
                        setMyTopTracks(data.tracks.map(e => e.uri))
                    }
                })
            }
        })
    }, [])

    if(me && myTopArtists && myTopTracks){
        console.log("Me", me)
        return (
            <>
                <div className="ui fixed secondary large menu" style={{background: '#fff'}}>
                    <div className="item">
                        <a className="item">Topify</a>
                    </div>
                    <div className="right menu">
                        <a className="item" href={me.uri} target="_blank" rel="noopener noreferrer">{me.display_name}</a>
                        <a className="item" onClick={onClickEvent} href="/">Logout</a>
                    </div>
                </div>

                <div className="ui container">
                    <TopifyMe me={me} myTopArtists={myTopArtists} />
                    <TopifyTop spotifyApi={spotifyApi} />
                    <TopifyPlaylist id={me.id} myTopTracks={myTopTracks} spotifyApi={spotifyApi} />
                </div>
                
                <div className="ui vertical footer segment">
                        <div className="ui center aligned container">
                            <div className="ui horizontal small link list" >
                                <a className="item" href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">create-react-app</a>
                                <a className="item" href="https://semantic-ui.com/" target="_blank" rel="noopener noreferrer">Semantic UI</a>
                                <a className="item" href="https://developer.spotify.com/documentation/web-api/quick-start/" target="_blank" rel="noopener noreferrer">Spotify Web API</a>
                                <a className="item" href="https://github.com/JMPerez/spotify-web-api-js" target="_blank" rel="noopener noreferrer">spotify-web-api-js</a>
                                <a className="item" href="https://www.chartjs.org/" target="_blank" rel="noopener noreferrer">Chart.js</a>
                                <a className="item" href="https://github.com/jerairrest/react-chartjs-2" target="_blank" rel="noopener noreferrer">react-chartjs-2</a>
                            </div>
                        </div>
                    </div>
            </>
        )
    }

    return <div className="ui active inverted huge text loader">Loading</div>
}

export default TopifyShow;