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
            <div style={{textAlign: 'center', padding: '100px 0'}}>
                <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>Your Topify Playlist</h1>
                <h3 style={{color: "#bb86fc"}}>We’ve generated a playlist just for you based on your most recent streaming history. Enjoy!</h3>
                <a className="circular ui inverted button" href={playlistUri}>OPEN IN SPOTIFY</a>
            </div>
        )
    }

    return (
        <div style={{textAlign: 'center', padding: '100px 0'}}>
            <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>Your Topify Playlist</h1>
            <h3 style={{color: "#bb86fc"}}>We’ve generated a playlist just for you based on your most recent streaming history. Enjoy!</h3>
            <a className="circular ui inverted button" onClick={onButtonClick}>SAVE TO SPOTIFY</a>
        </div>
    )
}

export default TopifyPlaylist