import React from 'react';
import spotify from '../apis/spotify';

const CreateButton = props => {
    return (
        <button onClick={() => {
            if(props.token){
                (async (token) => {

                    let response = await spotify.get('/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    const user_id = response.data.id;

                    response = await spotify.post(`/users/${user_id}/playlists`, {name: `top_tracks_${props.timeRange}`,
                    description: 'https://topify-app.herokuapp.com/'}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    const playlist_id = response.data.id
                    const external_urls = response.data.external_urls.spotify

                    response = await spotify.get('/me/top/tracks', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        params: {
                            limit: 50,
                            time_range: props.timeRange
                        }
                    })
                    const items = response.data.items;
                    const uris = items.map(el => el.uri);
                    
                    response = await spotify.post(`/playlists/${playlist_id}/tracks`, {'uris': uris}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    window.open(external_urls, '_blank');

                })(props.token)
            }
        }} className="ui secondary button">Create Playlist</button>
    )
}

export default CreateButton;