import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

function App(props) {
	const [searchResults, setSearchResults] = useState([
		{
			name: 'A Name',
			artist: 'Kanye West',
			album: 'My Beautiful Dark Twisted Fantasy',
			id: 1,
		},
	]);

	const [playlistName, setPlaylistName] = useState('Current Playlist Title');

	const [playlistTracks, setPlaylistTrack] = useState([
		{
			name: 'A Name',
			artist: 'Kanye West',
			album: 'Graduation',
			id: 13,
		},
	]);

	function addTrack(track){
		for (const property in track){
			console.log(`${property} --- ${track[property]}`);
		}

		const trackExists = playlistTracks.filter(singleTrack => (singleTrack.id === track.id));

		if (!trackExists){
			setPlaylistTrack(oldPlaylist => [...oldPlaylist, track]);
		}
	}

	return (
		<div>
			<h1>
				gr<span className="highlight">oooo</span>vyLists
			</h1>
			<div className="App">
				<SearchBar />
				<div className="App-playlist">
					<SearchResults results={searchResults} onAdd={addTrack}/>
					<Playlist playlistName={playlistName} tracklist={playlistTracks}/>
				</div>
			</div>
		</div>
	);
}

export default App;
