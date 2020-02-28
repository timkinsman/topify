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
      {!token && (
        <Cover token={token} />
      )}
      {token && (
        <Cover token={token} />
      )}
      <Footer />
    </React.Fragment>
  );
}

export default App;