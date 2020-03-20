import React from 'react'
import {Pie} from 'react-chartjs-2'

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
            backgroundColor: ['#bb86fc', '#913bfa', '#6906e2', '#460497', '#23024b'],
            borderWidth: 0
        }]
    }
    return (
        <div className="ui stackable one column grid" style={{height: '100vh', padding: '100px 0'}}>
            <div className="middle aligned column">
                <div style={{textAlign: 'center'}}>
                    <h1 className="ui inverted grey header" style={{fontSize: '-webkit-xxx-large'}}>Welcome, {me.display_name.replace(/ .*/,'')}!</h1>
                    <p style={{color: "#bb86fc"}}>Your top genre is {Object.keys(sortable)[0]} which appears in {Object.values(sortable)[0] * 100}% of your top artists.</p>
                </div>
            </div>
            <div className="middle aligned column">
                <Pie data={data} />
            </div>
        </div>
    )
}

export default TopifyMe;