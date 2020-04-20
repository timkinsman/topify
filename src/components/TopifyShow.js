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
                <div className="ui icon secondary menu" style={{background: '#fff'}}>
                    <div className="item">
                        <a className="item" href="https://github.com/timkinsman/topify" target="_blank" rel="noopener noreferrer">
                            <i className="github large icon"></i>
                        </a>
                    </div>
                    <div className="right menu">
                        <a className="item" href={me.uri} target="_blank" rel="noopener noreferrer">{me.display_name}</a>
                        <a className="item" onClick={onClickEvent} href="/">Sign Out</a>
                    </div>
                </div>

                <div className="ui container" style={{textAlign: 'center', margin: '50px 0'}}>
                    <h1>Topify</h1>
                    <TopifyContent
                        AL={myTopArtistsLifetime}
                        TL={myTopTracksLifeTime}
                        AR={myTopArtistsRecent}
                        TR={myTopTracksRecent}
                    />
                </div>  
                <div>
                    <h1>FOTTER</h1>
                </div>
            </div>
        )
    }

    return <div className="ui active huge text loader">Loading</div>
}

export default TopifyShow;