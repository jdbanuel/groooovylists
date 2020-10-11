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

	return (
		<div>
			<h1>
				gr<span className="highlight">oooo</span>vyLists
			</h1>
			<div className="App">
				<SearchBar />
				<div className="App-playlist">
					<SearchResults results={searchResults} />
					<Playlist />
				</div>
			</div>
		</div>
	);
}

export default App;
