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
                        Footer
                    </div>
                </div>
            </div>
        )
    }

    return <div class="ui active inverted huge text loader">Loading</div>
}

export default TopifyShow;