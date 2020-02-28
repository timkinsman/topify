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

    const renderTime = (timeRange) => {
        if(timeRange === "long_term"){
            return <h4>All Time</h4>;
        }else if(timeRange === "medium_term"){
            return <h4>6 Months</h4>;
        }else if(timeRange === "short_term"){
            return <h4>4 Weeks</h4>
        }
    }

    return (
        <div className="column">
            {renderTime(props.timeRange)}
            {data.map(data => <p key={data.id}>{data.name}</p>)}
        </div>
    )
}

export default PannelList;