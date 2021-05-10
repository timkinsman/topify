import React, {useState} from 'react';

import styles from "./Content.module.css"

const Content = ({myTop}) => {
    const [choice, setChoice] = useState(myTop[0]);
    const [index, setIndex] = useState(0)
    const [tab, setTab] = useState("Artists")

    return(
        <React.Fragment>
            <div className={styles["content-cy-ur"]}>
                <h2>see your.</h2>

                <div className={styles["content"]}>
                    <div><a onClick={() => {setChoice(myTop[0]); setIndex(0); setTab("Artists")}} style={{opacity: choice === myTop[0] ? '1' : '0.4'}}>Artists<br />Lifetime</a></div>
                    <div><a onClick={() => {setChoice(myTop[1]); setIndex(0); setTab("Tracks")}} style={{opacity: choice === myTop[1] ? '1' : '0.4'}}>Tracks<br />Lifetime</a></div>
                    <div><a onClick={() => {setChoice(myTop[2]); setIndex(0); setTab("Artists")}} style={{opacity: choice === myTop[2] ? '1' : '0.4'}}>Artists<br />Recent</a></div>
                    <div><a onClick={() => {setChoice(myTop[3]); setIndex(0); setTab("Tracks")}} style={{opacity: choice === myTop[3] ? '1' : '0.4'}}>Tracks<br />Recent</a></div>
                </div>
            </div>

            <div className={styles["content-choice"]}>
                <img 
                    alt={choice[index].name}
                    src={tab === "Artists" ? choice[index].images[0].url : choice[index].album.images[0].url} 
                />
                <div className={styles["content-choice-details"]}>
                    <h2>{choice[index].name} // {index + 1}</h2>
                    <p style={{textTransform: 'capitalize'}}>{tab === "Artists" ? choice[index].genres[0] : choice[index].artists[0].name}</p>
                    <p><a href={choice[index].uri}>Visit</a></p>
                </div>
            </div>

            <div className={styles["content-grid"]}>
                {choice.map((el, i) => 
                    <div className={styles["content-img-container"]} onClick={() => setIndex(i)}>
                        <img
                            alt={el.name}
                            onClick={window.scrollTo(0, 0)}
                            src={tab === "Artists" ? el.images[0].url : el.album.images[0].url} 
                        />
                        <div className={styles["content-img-div"]}>
                            <div>{el.name} // {i + 1}</div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default Content