import React, {useEffect, useState} from "react";

import hash from "../hash";

import TopifyShow from "./TopifyShow";
import TopifyWelcome from "./TopifyWelcome";

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

  if(token){
    return <TopifyShow token={token} onClickEvent={() => {localStorage.removeItem("token"); setToken(null);}} />
  }

  return <TopifyWelcome />
}

export default App;