import React, {useEffect, useState} from 'react';

const TopifyArtists = ({spotifyApi}) => {
    const [myTopArtists, setMyTopArtists] = useState();

    useEffect(() => {
        spotifyApi.getMyTopArtists({limit: '5', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopArtists(data.items)
        })
    }, [])

    if(myTopArtists){
        console.log("myTopArtists", myTopArtists)
        return (
            <div className="ui stackable two column grid">
                <div className="middle aligned column" style={{textAlign: '-webkit-center'}}>
                    <img className="ui large image" src={myTopArtists[0].images[0].url} alt="img" style={{boxShadow: '0 0 5px'}} />
                </div>
                <div className="middle aligned column" style={{textAlign: 'center'}}>
                    <h1 className="ui inverted grey header">Your Top Artist</h1>
                    <h1 className="ui inverted grey header">{myTopArtists[0].name}</h1>
                </div>
            </div>
        )
    }

    return <div>Loading</div>
}

export default TopifyArtists;