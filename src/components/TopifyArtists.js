import React, {useEffect, useState} from 'react';

const TopifyArtists = ({spotifyApi}) => {
    const [myTopArtists, setMyTopArtists] = useState();

    useEffect(() => {
        spotifyApi.getMyTopArtists({limit: '50', time_range: 'long_term'}, function(err, data) {
            if (err) console.error(err);
            else setMyTopArtists(data.items)
        })
    }, [])

    if(myTopArtists){
        console.log("myTopArtists", myTopArtists)
        return (
            <div className="ui stackable two column grid">
                <div className="middle aligned column">
                    <img className="ui large image" src={myTopArtists[0].images[0].url} alt="img" />
                </div>
                <div className="middle aligned column">
                    Right
                </div>
            </div>
        )
    }

    return <div>Loading</div>
}

export default TopifyArtists;