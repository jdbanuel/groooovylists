let userAccessToken, expiresIn;

const redirectURI = 'http://localhost:3000/';
const clientID = process.env.REACT_APP_CLIENT_ID;

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

        this.getAccessToken();

        return fetch(spotifyEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
            },
        }).then((response) => {
            return response.json();
        });
    },

    getUserID() {
        this.getAccessToken();

        return fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        });
    },

    createPlaylist(playlistName, userID) {
        this.getAccessToken();

        const endpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;

        const playlistData = {
            name: playlistName,
        };
        return fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
            },
            body: JSON.stringify(playlistData),
        }).then((response) => {
            return response.json();
        });
    },

    addSongsToPlaylist(playlistID, tracklistURIs) {
        this.getAccessToken();

        const endpoint = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

        const trackData = {
            uris: tracklistURIs,
        };
        return fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
            },
            body: JSON.stringify(trackData),
        });
    },
};

export default Spotify;
