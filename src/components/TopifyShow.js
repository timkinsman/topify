import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import TopifyContent from './TopifyContent';

const TopifyShow = ({token, onClickEvent}) => {
    const [me, setMe] = useState();
    const [myTopArtistsLifetime, setMyTopArtistsLifetime] = useState();
    const [myTopTracksLifeTime, setMyTopTracksLifeTime] = useState();
    const [myTopArtistsRecent, setMyTopArtistsRecent] = useState();
    const [myTopTracksRecent, setMyTopTracksRecent] = useState();

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    useEffect(() => {
        spotifyApi.getMe({}, function(err, data) {
            if (err) console.error(err);
            else setMe(data);
        })
        spotifyApi.getMyTopArtists({limit: '20', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopArtistsLifetime(data.items);
        })
        spotifyApi.getMyTopTracks({limit: '20', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopTracksLifeTime(data.items);
        })
        spotifyApi.getMyTopArtists({limit: '20', time_range: 'short_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopArtistsRecent(data.items);
        })
        spotifyApi.getMyTopTracks({limit: '20', time_range: 'short_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopTracksRecent(data.items);
        })
    }, [])

    if(me && myTopArtistsLifetime && myTopTracksLifeTime && myTopArtistsRecent && myTopTracksRecent){
        return (
            <div>
                <div className="ui fixed secondary menu" style={{background: '#fff'}}>
                    <a className="item" href="https://github.com/timkinsman/topify" target="_blank" rel="noopener noreferrer">
                        <i className="github large icon"></i>
                    </a>
                    <div className="right menu">
                        <a className="item" href={me.uri}>{me.display_name}</a>
                        <a className="item" onClick={onClickEvent} href="/">Sign Out</a>
                    </div>
                </div>

                <div className="ui container">
                    <TopifyContent
                        myTop={[myTopArtistsLifetime, myTopTracksLifeTime, myTopArtistsRecent, myTopTracksRecent]}
                    />
                </div>

                <div style={{textAlign: 'center', padding: '50px 0'}}>
                        <h1>What is Topify?</h1>
                        <p>Reveals your top Spotify tracks and artists via <a href='https://developer.spotify.com/documentation/web-api/' target="_blank" rel="noopener noreferrer">Spotify's Web API</a>.</p>
                </div>
            </div>
        )
    }

    return <div className="ui active huge text loader">Loading</div>
}

export default TopifyShow;