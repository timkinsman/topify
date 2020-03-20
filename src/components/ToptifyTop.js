import React from 'react';
import TopifyArtists from './TopifyArtists';
import TopifyTracks from './TopifyTracks';

const TopifyTop = ({myTopArtists, spotifyApi}) => {
    return (
        <div style={{padding: '100px 0'}}>
            <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textAlign: 'center'}}>Your Favourites</h1>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '64px'}}>
                <p style={{margin: '0 10px 14px 10px'}}>Spotify Lifetime</p>
                <p style={{margin: '0 10px 14px 10px'}}>Recent Listening</p>
            </div>
            <TopifyArtists myTopArtists={myTopArtists} spotifyApi={spotifyApi} />
            <TopifyTracks spotifyApi={spotifyApi} />
        </div>
    )
}

export default TopifyTop