import { apiCredentials } from './credentials';

let userAccessToken, expiresIn;

const redirectURI = 'http://localhost:3000/';
const clientID = apiCredentials.clientID;

let Spotify = {
    getAccessToken() {
        if (!userAccessToken) {
            //check Url to see if token is present
            const url = window.location.href;
            const tokenRegExp = /access_token=([^&]*)/;
            const expiresRegExp = /expires_in=([^&]*)/;
            const possibleToken = url.match(tokenRegExp);
            const possibleExpiresIn = url.match(expiresRegExp);

            if (possibleToken && possibleExpiresIn) {
                //If it exists set the necessary values and set a timer to remove the token when it expires.
                userAccessToken = possibleToken[0].slice(13);
                expiresIn = possibleExpiresIn[0].slice(12);

                window.setTimeout(
                    () => (userAccessToken = ''),
                    expiresIn * 1000
                );
                window.history.pushState('Access Token', null, '/');
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            }
        } else {
            return userAccessToken;
        }
    },

    search(term) {
        const spotifyEndpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        if (!userAccessToken){
            this.getAccessToken();
        }

        return fetch(spotifyEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
            },
        }).then((response) => {
            return response.json();
        }); 
    }
};

export default Spotify;
