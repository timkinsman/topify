import React from 'react';
import TopifyArtists from './TopifyArtists';
import TopifyTracks from './TopifyTracks';

const TopifyTop = ({myTopArtists, spotifyApi}) => {
    return (
        <div style={{padding: '100px 0'}}>
            <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textAlign: 'center'}}>Your Favourites</h1>
            <p>Spotify Lifetime</p>
            <p>Recent Listening</p>
            <TopifyArtists myTopArtists={myTopArtists} spotifyApi={spotifyApi} />
            <TopifyTracks spotifyApi={spotifyApi} />
        </div>
    )
}

export default TopifyTop