import React from 'react';

import {authEndpoint, clientId, redirectUri, scopes} from "../config";

import styles from "./Auth.module.css"

const Auth = () => {
    const href = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&show_dialog=true&expires_in=3600`

    return (
        <div className={styles["auth-container"]}>
            <h1 className={styles["auth-title"]}>Transparency.</h1>
            <a href={href}>Connect Spotify</a>
        </div>
    )
}

export default Auth;