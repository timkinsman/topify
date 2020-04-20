import React, {useState} from 'react';

const TopifyContent = ({AL, TL, AR, TR}) => {
    const [selected, setSelected] = useState(AL);
    const [seeMore, setSeeMore] = useState(false)

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
                                    />
                                    <div className='overlay'>
                                        <div className='text'>{el.name} // {i + 1}</div>
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
                <div class="four wide column"><a onClick={() => setSelected(AL)} className={selected === AL ? 'active' : null}>Artists<br />Lifetime</a></div>
                <div class="four wide column"><a onClick={() => setSelected(TL)} className={selected === TL ? 'active' : null}>Tracks<br />Lifetime</a></div>
                <div class="four wide column"><a onClick={() => setSelected(AR)} className={selected === AR ? 'active' : null}>Artists<br />Recent</a></div>
                <div class="four wide column"><a onClick={() => setSelected(TR)} className={selected === TR ? 'active' : null}>Tracks<br />Recent</a></div>
            </div>
            <div class="ui grid">
                <div class="eight wide column">
                    <img 
                        src={selected === AL || selected === AR ? selected[0].images[0].url : selected[0].album.images[0].url} 
                        style={{width: '100%'}}
                    />
                </div>
                <div class="eight wide column" style={{alignSelf: 'center'}}>
                    <h1 className="h01">{selected[0].name}</h1>
                    <p className="h00">{selected === AL || selected === AR ? selected[0].genres[0] : selected[0].artists[0].name}</p>
                </div>
            </div>
            <div>
                {seeMoreButton(seeMore)}
            </div>
        </div>
    )
}

export default TopifyContent