import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

function App(props) {
    const [searchResults, setSearchResults] = useState([]);

    const [playlistName, setPlaylistName] = useState('New Playlist');

    const [playlistTracks, setPlaylistTrack] = useState([]);

    async function search(searchTerm) {
        const results = await Spotify.search(searchTerm);

        let resultArray;

        resultArray = results.tracks.items.map((song) => {
                        return {id: song.id,
                            name: song.name,
                            artist: song.artists[0].name,
                            album: song.album.name,
                            uri: song.uri}
                        });

        console.log(resultArray)
        
        setSearchResults(resultArray);
    }

    function savePlaylist() {
        const trackURIs = [];

        playlistTracks.forEach((track) => {
            trackURIs.push(track.id);
        });

        return trackURIs;
    }

    function addTrack(track) {
        const trackExists = playlistTracks.filter(
            (singleTrack) => singleTrack.id === track.id
        );

        if (trackExists.length === 0) {
            setPlaylistTrack([...playlistTracks, track]);
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

        setPlaylistTrack([...updatedTrackList]);
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
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
