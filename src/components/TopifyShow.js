import React, {useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-js';
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
            <>
                <div className="ui fixed inverted borderless menu" style={{background: '#121212'}}>
                    <div className="header item">
                        <img src="/" className="ui tiny image" alt='topify' />
                    </div>
                    <div className="right menu">
                        <a className="item" href={me.uri} target="_blank" rel="noopener noreferrer">{me.display_name}</a>
                        <a className="item" onClick={onClickEvent} href="/">Log Out</a>
                    </div>
                </div>

                <div className="ui container">

                    <TopifyMe me={me} myTopArtists={myTopArtists} />
                    <TopifyArtists myTopArtists={myTopArtists} />
                    <TopifyTracks spotifyApi={spotifyApi} />

                    <div className="ui inverted vertical footer segment" style={{background: '#121212'}}>
                        <div className="ui center aligned container">
                            <div className="ui inverted horizontal small link list" >
                                <a className="item" href="https://github.com/facebook/create-react-app" target="_blank" rel="noopener noreferrer">create-react-app</a>
                                <a className="item" href="https://semantic-ui.com/" target="_blank" rel="noopener noreferrer">Semantic UI</a>
                                <a className="item" href="https://developer.spotify.com/documentation/web-api/quick-start/" target="_blank" rel="noopener noreferrer">Spotify Web API</a>
                                <a className="item" href="https://github.com/JMPerez/spotify-web-api-js" target="_blank" rel="noopener noreferrer">spotify-web-api-js</a>
                            </div>
                            <p>Branding by Kesha Crowley</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return <div className="ui active inverted huge text loader">Loading</div>
}

export default TopifyShow;