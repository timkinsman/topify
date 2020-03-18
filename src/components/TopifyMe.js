import React from 'react'
import {Bar} from 'react-chartjs-2'

const TopifyMe = ({me, myTopArtists}) => {
    var res = {}
    myTopArtists.forEach(v => v.genres.map(w => res[w] = (res[w] || 0) + 1))
    const data = {
        labels: Object.keys(res),
        datasets: [{
            data: Object.values(res),
            backgroundColor: 'orange'
        }],
    }
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        title: {
            display: true,
            text: 'Top genres (sampled from your top 25 artists)'
        },
        legend: {
            display: false
        }
    }

    return (
        <div className="ui grid" style={{height: '100vh'}}>
            <div className="middle aligned column">
                <div style={{margin: '50px 0'}}>
                    <h1 className="ui inverted grey header">Welcome, {me.display_name.replace(/ .*/,'')}!</h1>
                    <h1 style={{color: "orange"}}>Your top tracks and artists await...</h1>
                </div>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default TopifyMe;