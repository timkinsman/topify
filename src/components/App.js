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
      const now = new Date()
      const item = {
        value: _token,
        expiry: now.getTime() + (60 * 60 * 1000)
      }
      localStorage.setItem("token", JSON.stringify(item));
    }

    const itemStr = localStorage.getItem("token")
    if (!itemStr) {
      return 
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if(now.getTime() > item.expiry){
      localStorage.removeItem("token")
      return 
    }

    setToken(item.value);
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