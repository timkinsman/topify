import React, {useEffect, useState} from 'react';

const TopifyTracks = ({spotifyApi, timeRange}) => {
    const [myTopTracks, setMyTopTracks] = useState();
    const [myTopRecentTracks, setMyTopRecentTracks] = useState();

    useEffect(() => {
        spotifyApi.getMyTopTracks({limit: '5', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopTracks(data.items)
        })
        spotifyApi.getMyTopTracks({limit: '5', time_range: 'short_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopRecentTracks(data.items)
        })
    }, [])

    if(myTopTracks && setMyTopRecentTracks){
        if(timeRange === 'lifetime'){
            console.log("myTopTracks", myTopTracks)
            return (
                <div className="ui stackable two column grid">
                    <div className="middle aligned column" style={{textAlign: 'center'}}>
                        <h1 className="ui inverted grey header">Your Top Track</h1>
                        <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>{myTopTracks[0].name}</h1>
                    </div>
                    <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                        <img className="ui large image" src={myTopTracks[0].album.images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                    </div>
                </div>
            )
        }
        console.log("myTopRecentTracks", myTopRecentTracks)
        return (
            <div className="ui stackable two column grid">
                <div className="middle aligned column" style={{textAlign: 'center'}}>
                    <h1 className="ui inverted grey header">Your Top Track</h1>
                    <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>{myTopRecentTracks[0].name}</h1>
                </div>
                <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                    <img className="ui large image" src={myTopRecentTracks[0].album.images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                </div>
            </div>
        )
    }

    return <div>Loading</div>
}

export default TopifyTracks;