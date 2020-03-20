import React, {useEffect, useState} from 'react';

const TopifyTracks = ({spotifyApi}) => {
    const [myTopTracks, setMyTopTracks] = useState();

    useEffect(() => {
        spotifyApi.getMyTopTracks({limit: '5', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopTracks(data.items)
        })
    }, [])

    if(myTopTracks){
        console.log("myTopTracks", myTopTracks)
        return (
            <div className="ui stackable two column grid">
                <div className="middle aligned column" style={{textAlign: 'center'}}>
                    <h1 className="ui inverted grey header">Your Top Track</h1>
                    <h1 className="ui inverted grey header">{myTopTracks[0].album.artists[0].name}</h1>
                </div>
                <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                    <img className="ui large image" src={myTopTracks[0].album.images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                </div>
            </div>
        )
    }

    return <div>Loading</div>
}

export default TopifyTracks;