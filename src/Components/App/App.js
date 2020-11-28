import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

function App() {
    const [searchResults, setSearchResults] = useState([]);

    const [playlistName, setPlaylistName] = useState('New Playlist');

    const [playlistTracks, setPlaylistTracks] = useState([]);

    Spotify.getAccessToken();

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

        await Spotify.addSongsToPlaylist(playlistID, trackURIs);

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
