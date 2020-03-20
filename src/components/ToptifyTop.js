import React, {useState} from 'react';
import TopifyArtists from './TopifyArtists';
import TopifyTracks from './TopifyTracks';

import './TopifyTop.css'

const TopifyTop = ({myTopArtists, spotifyApi}) => {
    const [timeRange, setTimeRange] = useState('lifetime')

    return (
        <div style={{padding: '100px 0'}}>
            <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textAlign: 'center'}}>Your Favourites</h1>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '64px'}}>
                <a className={timeRange === 'lifetime' ? null : "not-active"} onClick={() => setTimeRange('lifetime')} style={{margin: '0 10px 14px 10px'}}>Spotify Lifetime</a>
                <a className={timeRange === 'recent' ? null : "not-active"} onClick={() => setTimeRange('recent')} style={{margin: '0 10px 14px 10px'}}>Recent Listening</a>
            </div>
            <TopifyArtists myTopArtists={myTopArtists} spotifyApi={spotifyApi} timeRange={timeRange} />
            <TopifyTracks spotifyApi={spotifyApi} timeRange={timeRange} />
        </div>
    )
}

export default TopifyTop