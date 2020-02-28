import React, {useState, useEffect} from 'react';
import spotify from '../apis/spotify';

const PannelList = props => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if(props.token){
            (async (token) => {
                const response = await spotify.get(`/me/top/${props.type}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    limit: 10,
                    time_range: props.timeRange
                }
                })
                setData(response.data.items);
            })(props.token)
        }
    }, []);

    return (
        <div className="column">
            <h4>{props.timeRange}</h4>
            {data.map(data => <p key={data.id}>{data.name}</p>)}
        </div>
    )
}

export default PannelList;