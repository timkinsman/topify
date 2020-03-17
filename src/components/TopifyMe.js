import React from 'react'
import {Bar} from 'react-chartjs-2'

const TopifyMe = ({me, myTopArtists}) => {
    var res = {}
    myTopArtists.forEach(v => {res[v.genres[0]] = (res[v.genres[0]] || 0) + 1})
    const data = {
        datasets: [{
            data: Object.values(res),
            backgroundColor: '#1DB954'
        }],
        labels: Object.keys(res)
    }
    return (
        <div className="ui stackable two column grid" style={{height: '100vh'}}>
            <div className="middle aligned column">
                <div>
                
                <h1 className="ui inverted grey header">Welcome, {me.display_name.replace(/ .*/,'')}!</h1>
                <h1 style={{color: "#1DB954"}}>Your top tracks and artists await...</h1>
                </div>
            </div>
            <div className="middle aligned column">
                <Bar data={data} />
            </div>
        </div>
    )
}

export default TopifyMe;