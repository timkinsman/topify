import React, {useState} from 'react';
import TopifyArtists from './TopifyArtists';
import TopifyTracks from './TopifyTracks';

import './TopifyTop.css'

const TopifyTop = ({myTopArtists, spotifyApi}) => {
    const [timeRange, setTimeRange] = useState('lifetime')
    const [type, setType] = useState('artists')

    return (
        <div className="ui stackable one column grid" style={{padding: '100px 0', height: '100vh'}}>
            <div className="middle aligned column">
                <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textAlign: 'center'}}>YOUR TOP <a className={type === 'artists' ? null : "not-active"} onClick={() => setType('artists')}>ARTISTS</a> <a className={type === 'tracks' ? null : "not-active"} onClick={() => setType('tracks')}>TRACKS</a></h1>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '64px'}}>
                    <a className={timeRange === 'lifetime' ? null : "not-active"} onClick={() => setTimeRange('lifetime')} style={{margin: '0 10px 14px 10px'}}>lifetime</a>
                    <a className={timeRange === 'recent' ? null : "not-active"} onClick={() => setTimeRange('recent')} style={{margin: '0 10px 14px 10px'}}>recent listening</a>
                </div>
                {type==='artists' ? <TopifyArtists myTopArtists={myTopArtists} spotifyApi={spotifyApi} timeRange={timeRange} /> : <TopifyTracks spotifyApi={spotifyApi} timeRange={timeRange} />}
            </div>
        </div>
    )
}

export default TopifyTop