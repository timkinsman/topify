import React, {useState} from 'react';

const TopifyContent = ({AL, TL, AR, TR}) => {
    const [selected, setSelected] = useState(AL);
    const [seeMore, setSeeMore] = useState(false)
    const [index, setIndex] = useState(0)

    const seeMoreButton = (seeMore) => {
        if(seeMore){
            return (
                <div>
                    <div style={{padding: '25px'}}>
                        <a onClick={() => setSeeMore(false)}>See less</a>
                    </div>
                    <div className="ui grid">
                        {selected.map((el, i) => 
                            <div className="four wide column">
                                <div className='wrapper'>
                                    <img
                                        className='image' 
                                        src={selected === AL || selected === AR ? el.images[0].url : el.album.images[0].url} 
                                        style={{width: '100%'}}
                                        onClick={window.scrollTo(0, 0)}
                                    />
                                    <div className='overlay' onClick={() => setIndex(i)}>
                                        <div className='text'>{i + 1} // {el.name}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
        return <div style={{padding: '25px'}}><a onClick={() => setSeeMore(true)}>See more</a></div>
    }

    return(
        <div>
            <div class="ui grid">
                <div class="four wide column"><a onClick={() => (setSelected(AL), setSeeMore(false), setIndex(0))} className={selected === AL ? 'active' : null}>Artists<br />Lifetime</a></div>
                <div class="four wide column"><a onClick={() => (setSelected(TL), setSeeMore(false), setIndex(0))} className={selected === TL ? 'active' : null}>Tracks<br />Lifetime</a></div>
                <div class="four wide column"><a onClick={() => (setSelected(AR), setSeeMore(false), setIndex(0))} className={selected === AR ? 'active' : null}>Artists<br />Recent</a></div>
                <div class="four wide column"><a onClick={() => (setSelected(TR), setSeeMore(false), setIndex(0))} className={selected === TR ? 'active' : null}>Tracks<br />Recent</a></div>
            </div>
            <div class="ui grid">
                <div class="eight wide column">
                    <img 
                        src={selected === AL || selected === AR ? selected[index].images[0].url : selected[index].album.images[0].url} 
                        style={{width: '100%'}}
                    />
                </div>
                <div class="eight wide column" style={{alignSelf: 'center'}}>
                    <h1 className="h01">{index + 1} // {selected[index].name}</h1>
                    <p className="h00" style={{textTransform: 'capitalize'}}>{selected === AL || selected === AR ? selected[index].genres[0] : selected[index].artists[0].name}</p>
                    <a className="h00" href={selected[index].uri}>
                        Visit
                    </a>
                </div>
            </div>
            <div>
                {seeMoreButton(seeMore)}
            </div>
        </div>
    )
}

export default TopifyContent