import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

function App() {
    const [searchResults, setSearchResults] = useState([]);

    const [playlistName, setPlaylistName] = useState('New Playlist');

    const [playlistTracks, setPlaylistTracks] = useState([]);

    async function search(searchTerm) {
        const results = await Spotify.search(searchTerm);

        let resultArray;

        if (results.tracks) {
            resultArray = results.tracks.items.map((song) => {
                return {
                    id: song.id,
                    name: song.name,
                    artist: song.artists[0].name,
                    album: song.album.name,
                    uri: song.uri,
                };
            });

            setSearchResults(resultArray);
        }
    }

    async function savePlaylist() {
        const trackURIs = [];

        Spotify.getAccessToken();

        const user = await Spotify.getUserID();
        const userID = user.id;

        const newlyCreatedPlaylist = await Spotify.createPlaylist(
            playlistName,
            userID
        );
        const playlistID = newlyCreatedPlaylist.id;

        playlistTracks.forEach((track) => {
            trackURIs.push(track.uri);
        });

        const addSongs = await Spotify.addSongsToPlaylist(playlistID, trackURIs)
            .then(() => {
                store.addNotification({
                    title: 'Success!',
                    message: 'Your playlist has been saved!',
                    type: 'success',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                    },
                });
            })
            .catch((error) => {
                console.log(error);
                store.addNotification({
                    title: 'Oops!',
                    message: 'There was an issue creating your playlist.',
                    type: 'danger',
                    insert: 'top',
                    container: 'top-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                        onScreen: true,
                    },
                });
            });

        console.log(`The value of addSongs is ${JSON.stringify(addSongs)}`);

        setPlaylistName('New Playlist');
        setPlaylistTracks([]);

        return;
    }

    function addTrack(track) {
        const trackExists = playlistTracks.filter(
            (singleTrack) => singleTrack.id === track.id
        );

        console.log(track);

        if (trackExists.length === 0) {
            setPlaylistTracks([...playlistTracks, track]);
        }
    }

    function handleNameChange(event) {
        setPlaylistName(event.target.value);
        event.preventDefault();
    }

    function removeTrack(track) {
        const updatedTrackList = playlistTracks.filter(
            (singleTrack) => singleTrack.id !== track.id
        );

        setPlaylistTracks([...updatedTrackList]);
    }

    return (
        <div>
            <ReactNotification />
            <h1>
                gr<span className="highlight">oooo</span>vyLists
            </h1>
            <div className="App">
                <SearchBar onSearch={search} />
                <div className="App-playlist">
                    <SearchResults results={searchResults} onAdd={addTrack} />
                    <Playlist
                        playlistName={playlistName}
                        tracklist={playlistTracks}
                        onRemove={removeTrack}
                        handleChange={handleNameChange}
                        onSave={savePlaylist}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
