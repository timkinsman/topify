import React, { useState, useEffect } from "react";
import hash from "../hash";
import Cover from './Cover';
import Footer from './Footer';
import Header from './Header';
import Pannel from './Pannel';

const App = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    let _token = hash.access_token;

    if (_token) {
      localStorage.setItem("token", _token);
      setToken(_token);
    }

    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <React.Fragment>
      <Header 
        token={token}
        onClickEvent={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
      />
      <Cover />

      {token && (
        <React.Fragment>
          <Pannel token={token} type="artists" />
          <Pannel token={token} type="tracks" />
        </React.Fragment>
      )}

      <Footer />
    </React.Fragment>
  );
}

export default App;