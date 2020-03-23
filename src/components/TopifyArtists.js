import React, {useEffect, useState} from 'react';

const TopifyArtists = ({spotifyApi, timeRange}) => {
    const [myTopArtists, setMyTopArtists] = useState();
    const [myTopRecentArtists, setMyTopRecentArtists] = useState();

    useEffect(() => {
        spotifyApi.getMyTopArtists({limit: '5', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopArtists(data.items)
        })
        spotifyApi.getMyTopArtists({limit: '5', time_range: 'short_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopRecentArtists(data.items)
        })
    }, [])

    if(myTopArtists && myTopRecentArtists){
        if(timeRange === 'lifetime'){
            console.log("myTopArtists", myTopArtists)
            return (
                <div className="ui stackable two column grid">
                    <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                        <img className="ui large image" src={myTopArtists[0].images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                    </div>
                    <div className="middle aligned column" style={{textAlign: 'center'}}>
                        <a href={myTopArtists[0].uri} className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textTransform: 'uppercase'}}>{myTopArtists[0].name}</a>
                    </div>
                </div>
            )
        }
        console.log("myTopRecentArtists", myTopRecentArtists)
        return (
            <div className="ui stackable two column grid">
                <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                    <img className="ui large image" src={myTopRecentArtists[0].images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                </div>
                <div className="middle aligned column" style={{textAlign: 'center'}}>
                    <a href={myTopRecentArtists[0].uri} className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large', textTransform: 'uppercase'}}>{myTopRecentArtists[0].name}</a>
                </div>
            </div>
        )    
    }

    return (
        <div className="ui stackable two column grid">
            <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                <div class="ui placeholder">
                    <div class="square image"></div>
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

export default TopifyArtists;