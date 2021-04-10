import React, {useEffect, useState} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import styles from "./Landing.module.css"

import Content from './Content';

const Landing = ({token, onClickEvent}) => {
    const [me, setMe] = useState();
    const [myTopArtistsLifetime, setMyTopArtistsLifetime] = useState();
    const [myTopTracksLifeTime, setMyTopTracksLifeTime] = useState();
    const [myTopArtistsRecent, setMyTopArtistsRecent] = useState();
    const [myTopTracksRecent, setMyTopTracksRecent] = useState();

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    useEffect(() => {
        spotifyApi.getMyTopArtists({limit: '20', time_range: 'medium_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopArtistsLifetime(data.items);
        })
        spotifyApi.getMyTopTracks({limit: '20', time_range: 'medium_term'}, function(err, data) {
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

    if(myTopArtistsLifetime && myTopTracksLifeTime && myTopArtistsRecent && myTopTracksRecent){
        return (
            <div>
                <div className={styles["landing-nav"]}>
                    <h3>Transparency.</h3>
                    <a className={styles["landing-nav-right"]} onClick={onClickEvent}>Sign Out</a>
                </div>
                
                <div className={styles["landing-outer-container"]}>
                    <div className={styles["landing-inner-container"]}>
                        <Content myTop={[myTopArtistsLifetime, myTopTracksLifeTime, myTopArtistsRecent, myTopTracksRecent]} />

                        <div className={styles["landing-whatis"]}>
                            <h2>What is Transparency?</h2>
                            <p>Reveals your top Spotify tracks and artists via <a href='https://developer.spotify.com/documentation/web-api/' target="_blank" rel="noopener noreferrer">Spotify's Web API</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <div className="ui active huge text loader">Loading</div>
}

export default Landing;