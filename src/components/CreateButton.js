import React from 'react';
import spotify from '../apis/spotify';

const CreateButton = props => {
    const renderName = (timeRange) => {
        const now = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = monthNames[now.getMonth()]
        const year = now.getYear() + 1900;

        if(timeRange === "long_term"){
            return `All Time ${month} ${year}`
        }else if(timeRange === "medium_term"){
            return `6 Months ${month} ${year}`
        }else if(timeRange === "short_term"){
            return `4 Weeks ${month} ${year}`
        }
    }

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

                    response = await spotify.post(`/users/${user_id}/playlists`, {name: renderName(props.timeRange),
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
        }} className="ui secondary button">Create</button>
    )
}

export default CreateButton;