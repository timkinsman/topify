import React, {useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
import { Bar } from 'react-chartjs-2';
import TopifyMe from './TopifyMe';
import TopifyArtists from './TopifyArtists'
import TopifyTracks from './TopifyTracks';

const TopifyShow = ({token, onClickEvent}) => {
    const [me, setMe] = useState();
    const [myTopArtists, setMyTopArtists] = useState();

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
    }, [])

    if(me && myTopArtists){
        console.log("Me", me)
        console.log("myTopArtists", myTopArtists)

        return (
            <div className="ui container">
                <div className="ui fixed inverted borderless menu" style={{background: '#121212'}}>
                    <div className="ui container">
                        <div className="header item">
                            <img src="/" className="ui tiny image" alt='topify' />
                        </div>
                        <div className="right menu">
                            <a className="item" href={me.uri} target="_blank" rel="noopener noreferrer">{me.display_name}</a>
                            <a className="item" onClick={onClickEvent} href="/">Log Out</a>
                        </div>
                    </div>
                </div>

                <TopifyMe me={me} myTopArtists={myTopArtists} />
                <TopifyArtists myTopArtists={myTopArtists} />
                <TopifyTracks />

                <div className="ui inverted vertical footer segment" style={{background: '#121212'}}>
                    <div className="ui center aligned container">
                        Built with <a href="https://reactjs.org/" target="_blank" without rel="noopener noreferrer">React</a> · <a href="https://semantic-ui.com/" target="_blank" without rel="noopener noreferrer">Semantic UI</a> · <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" without rel="noopener noreferrer">Spotify Web API</a> · <a href="https://github.com/JMPerez/spotify-web-api-js" target="_blank" without rel="noopener noreferrer">spotify-web-api-js</a> · and more!
                        <p>Branding by Kesha Crowley</p>
                    </div>
                </div>
            </div>
        )
    }

    return <div class="ui active inverted huge text loader">Loading</div>
}

export default TopifyShow;