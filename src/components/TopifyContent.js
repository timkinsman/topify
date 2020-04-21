import React, {useState} from 'react';

const TopifyContent = ({myTop}) => {
    const [showcased, setShowcased] = useState(myTop[0]);
    const [index, setIndex] = useState(0)

    return(
        <div>
            <div className="ui grid" style={{height: '100vh'}}>
                <div className="middle aligned column" style={{alignSelf: 'center'}}>
                    <h1 style={{margin: '14px 0'}}>Topify.</h1>
                    <div class="ui grid">
                        <div class="four wide column"><a href='#' onClick={() => {setShowcased(myTop[0]); setIndex(0)}} className={showcased === myTop[0] ? 'active' : null}>Artists<br />Lifetime</a></div>
                        <div class="four wide column"><a href='#' onClick={() => {setShowcased(myTop[1]); setIndex(0)}} className={showcased === myTop[1] ? 'active' : null}>Tracks<br />Lifetime</a></div>
                        <div class="four wide column"><a href='#' onClick={() => {setShowcased(myTop[2]); setIndex(0)}} className={showcased === myTop[2] ? 'active' : null}>Artists<br />Recent</a></div>
                        <div class="four wide column"><a href='#' onClick={() => {setShowcased(myTop[3]); setIndex(0)}} className={showcased === myTop[3] ? 'active' : null}>Tracks<br />Recent</a></div>
                    </div>
                    <div class="ui stackable grid">
                        <div class="eight wide column">
                            <img
                                alt={showcased[index].name}
                                src={showcased === myTop[0] || showcased === myTop[2] ? showcased[index].images[0].url : showcased[index].album.images[0].url} 
                            />
                        </div>
                        <div class="eight wide column" style={{alignSelf: 'center'}}>
                            <h1 className="h01">{showcased[index].name} // {index + 1}</h1>
                            <p className="h00" style={{textTransform: 'capitalize'}}>{showcased === myTop[0] || showcased === myTop[2] ? showcased[index].genres[0] : showcased[index].artists[0].name}</p>
                            <a className="h00" href={showcased[index].uri}>
                                Visit
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ui grid">
                {showcased.map((el, i) => 
                    <div className="four wide column">
                        <div className='wrapper'>
                            <img
                                alt={el.name}
                                className='image' 
                                src={showcased === myTop[0] || showcased === myTop[2] ? el.images[0].url : el.album.images[0].url} 
                                onClick={window.scrollTo(0, 0)}
                            />
                            <div className='overlay' onClick={() => setIndex(i)}>
                                <div className='text'>{el.name} // {i + 1}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TopifyContent