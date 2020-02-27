import React, { useState, useEffect } from "react";
import hash from "../hash";
import Header from './Header';
import Cover from './Cover';
import Footer from './Footer';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let _token = hash.access_token;

    if (_token) {
      setToken(_token)
    }
  }, []);

  return (
    <React.Fragment>
      <Header 
        token={token}
        onClickEvent={() => setToken(null)}
      />
      <Cover token={token} />
      {token && (
        <React.Fragment>
          <Cover token={token} />
          <Cover token={token} />
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default App;

/*getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    });
  }*/