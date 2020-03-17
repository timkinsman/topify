import React, {useEffect, useState} from 'react';

const TopifyTracks = ({spotifyApi}) => {
    const [myTopTracks, setMyTopTracks] = useState();

    useEffect(() => {
        spotifyApi.getMyTopTracks({limit: '50', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopTracks(data.items);
        })
    }, [])

    if(myTopTracks){
        console.log(myTopTracks)
        return (
            <div className="ui stackable two column grid" style={{height: '100vh'}}>
                <div className="middle aligned column">
                    Left
                </div>
                <div className="middle aligned column">
                    <img className="ui large image" src={myTopTracks[0].album.images[0].url} alt="img" />
                </div>
            </div>
        )
    }

    return <div>Loading</div>
}

export default TopifyTracks;