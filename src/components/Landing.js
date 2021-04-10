import React, {useEffect, useState} from 'react';
import {Dropdown, Icon, Menu} from 'semantic-ui-react'
import SpotifyWebApi from 'spotify-web-api-js';

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
        spotifyApi.getMe({}, function(err, data) {
            if (err) console.error(err);
            else setMe(data);
        })
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

    if(me && myTopArtistsLifetime && myTopTracksLifeTime && myTopArtistsRecent && myTopTracksRecent){
        return (
            <div>
                <div className="ui fixed secondary menu" style={{background: '#fff'}}>
                    <Menu.Item href='https://github.com/timkinsman/transparency/' target='_blank'>
                        <Icon fitted link name='github' size='large' />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                    <Dropdown item text={me.display_name}>
                        <Dropdown.Menu>
                            <Dropdown.Item href={me.uri}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={onClickEvent}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </Menu.Menu>
                </div>

                <div className="ui container">
                    <Content
                        myTop={[myTopArtistsLifetime, myTopTracksLifeTime, myTopArtistsRecent, myTopTracksRecent]}
                    />
                </div>

                <div style={{textAlign: 'center', padding: '50px 0'}}>
                        <h2>What is Transparency?</h2>
                        <p>Reveals your top Spotify tracks and artists via <a href='https://developer.spotify.com/documentation/web-api/' target="_blank" rel="noopener noreferrer">Spotify's Web API</a>.</p>
                </div>
            </div>
        )
    }

    return <div className="ui active huge text loader">Loading</div>
}

export default Landing;