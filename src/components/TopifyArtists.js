import React from 'react';

const TopifyArtists = ({myTopArtists}) => {
    return (
        <div className="ui stackable two column grid" style={{height: '100vh'}}>
            <div className="middle aligned column">
                <img className="ui large image" src={myTopArtists[0].images[0].url} alt="img" style={{float: 'right'}} />
            </div>
            <div className="middle aligned column">
                Right
            </div>
        </div>
    )
}

export default TopifyArtists;