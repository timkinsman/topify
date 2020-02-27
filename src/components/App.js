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
    <div>
      <Header 
        token={token}
        onClickEvent={() => setToken(null)}
      />
      <Cover />
      <Footer />
    </div>
  );
}

export default App;
