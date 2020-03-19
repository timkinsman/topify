import React from 'react'
import {Bar} from 'react-chartjs-2'

const TopifyMe = ({me, myTopArtists}) => {
    var res = {}
    myTopArtists.forEach(v => v.genres.map(w => res[w] = (res[w] || 0) + 1))
    var sortable = [];
    for (var genre in res) {
        sortable.push([genre, res[genre] / 50]);
    }
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    sortable = Object.fromEntries(sortable.slice(0, 5))
    const data = {
        labels: Object.keys(sortable),
        datasets: [{
            data: Object.values(sortable),
            backgroundColor: '#bb86fc'
        }],
    }
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    max: 1
                }
            }]
        },
        legend: {
            display: false
        },
        maintainAspectRatio: false
    }
    return (
        <div className="ui stackable two column grid" style={{height: '100vh'}}>
            <div className="middle aligned column">
                <div>
                    <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>Welcome, {me.display_name.replace(/ .*/,'')}!</h1>
                    <h1 style={{color: "#bb86fc"}}>Your top genre is {Object.keys(sortable)[0]} which appears in {Object.values(sortable)[0] * 100}% of your top artists.</h1>
                </div>
            </div>
            <div className="middle aligned column">
                <Bar data={data} options={options} height={500} options={options} />
            </div>
        </div>
    )
}

export default TopifyMe;