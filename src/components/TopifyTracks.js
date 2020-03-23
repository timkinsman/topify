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
                    <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                        <img className="ui large image" src={myTopTracks[0].album.images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                    </div>
                    <div className="middle aligned column" style={{textAlign: 'center'}}>
                        <a href={myTopTracks[0].uri} className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textTransform: 'uppercase'}}>{myTopTracks[0].name}</a>
                    </div>
                </div>
            )
        }
        console.log("myTopRecentTracks", myTopRecentTracks)
        return (
            <div className="ui stackable two column grid">
                <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                    <img className="ui large image" src={myTopRecentTracks[0].album.images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                </div>
                <div className="middle aligned column" style={{textAlign: 'center'}}>
                    <a href={myTopRecentTracks[0].uri} className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textTransform: 'uppercase'}}>{myTopRecentTracks[0].name}</a>
                </div>
            </div>
        )
    }

    return (
        <div className="ui stackable two column grid">
            <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                <div class="ui placeholder">
                    <div class="square image" style={{boxShadow: '0 0 5px'}}></div>
                </div>
            </div>
            <div className="middle aligned column" style={{textAlign: 'center'}}>
                <div class="ui placeholder">
                    <div class="line"></div>
                </div>
            </div>
        </div>
    )
}

export default TopifyTracks;