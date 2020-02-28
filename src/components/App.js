import React, { useState, useEffect } from "react";
import hash from "../hash";
import Cover from './Cover';
import Footer from './Footer';
import Header from './Header';
import Pannel from './Pannel';

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
      {!token && (
        <Cover token={token} />
      )}
      {token && (
        <React.Fragment>
          <Cover token={token} />
            <Pannel token={token} type="artists" />
            <Pannel token={token} type="tracks" />
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  );
}

export default App;