import React, {useEffect, useState} from 'react'
import SpotifyWebApi from 'spotify-web-api-js';

const TopifyShow = ({token, onClickEvent}) => {
    const [me, setMe] = useState();

    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);

    useEffect(() => {
        spotifyApi.getMe({}, function(err, data) {
            if (err) console.error(err);
            else setMe(data);
        })
    }, [])

    if(me){
        console.log("Me", me)
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
                    <div className="ui stackable two column grid" style={{height: '100vh'}}>
                        <div className="middle aligned column">
                            <div>
                               <h1 className="ui inverted grey header">Welcome, {me.display_name.replace(/ .*/,'')}!</h1>
                               <h1 style={{color: "#bb86fc"}}>Your top tracks and artists await...</h1>
                            </div>
                        </div>
                    </div>
                <div className="ui inverted vertical footer segment" style={{background: '#121212'}}>
                    <div className="ui center aligned container">
                        Built with <a href="https://reactjs.org/" target="_blank">React</a> · <a href="https://semantic-ui.com/" target="_blank">Semantic UI</a> · <a href="https://developer.spotify.com/documentation/web-api/" target="_blank">Spotify Web API</a> · <a href="https://github.com/JMPerez/spotify-web-api-js" target="_blank">spotify-web-api-js</a> · and more!
                        <p>Branding by Kesha Crowly</p>
                    </div>
                </div>
            </div>
        )
    }

    return <div class="ui active inverted huge text loader">Loading</div>
}

export default TopifyShow;