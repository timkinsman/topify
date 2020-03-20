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
                        <h1 className="ui inverted grey header">Your Top Artist</h1>
                        <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>{myTopArtists[0].name}</h1>
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
                    <h1 className="ui inverted grey header">Your Top Artist</h1>
                    <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>{myTopRecentArtists[0].name}</h1>
                </div>
            </div>
        )    
    }

    return <div>Loading</div>
}

export default TopifyArtists;