import React, {useState} from 'react'

const TopifyPlaylist = ({id, myTopTracks, spotifyApi}) => {
    const [createPlaylist, setCreatePlaylist] = useState(false);
    const [playlistUri, setPlaylistUri] = useState()

    const onButtonClick = () => {
        spotifyApi.createPlaylist(id, {name: 'Topify'}, function(err, data) {
            if (err) console.error(err);
            else {
                setPlaylistUri(data.uri)
                spotifyApi.addTracksToPlaylist(data.id, myTopTracks, {}, function(err, data) {
                    if (err) console.error(err);
                    else setCreatePlaylist(true);
                })
            }
        })
    }

    if(playlistUri && createPlaylist){
        return (
            
            <div className="ui stackable one column grid"  style={{height: '100vh', textAlign: 'center', padding: '100px 0'}}>
                <div className="middle aligned column">
                    <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>YOUR <span style={{color: '#bb86fc'}}>TOPIFY</span> PLAYLIST</h1>
                    <a className="circular ui button" href={playlistUri}>OPEN IN SPOTIFY</a>
                </div>
            </div>
        )
    }

    return (
        <div className="ui stackable one column grid"  style={{height: '100vh', textAlign: 'center', padding: '100px 0'}}>
            <div className="middle aligned column">
                <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>YOUR <span style={{color: '#bb86fc'}}>TOPIFY</span> PLAYLIST</h1>
                <a className="circular ui button" onClick={onButtonClick}>SAVE TO SPOTIFY</a>
            </div>
        </div>
    )
}

export default TopifyPlaylist