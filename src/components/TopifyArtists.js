import React from 'react';

const TopifyArtists = ({myTopArtists}) => {
    return (
        <div className="ui stackable two column grid" style={{height: '100vh'}}>
            <div className="middle aligned column">
                <img src={myTopArtists[0].images[0].url} />
            </div>
            <div className="middle aligned column">
                Right
            </div>
        </div>
    )
}

export default TopifyArtists;