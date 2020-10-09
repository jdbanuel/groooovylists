import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

function App() {
	return (
		<div>
			<h1>
				gr<span className="highlight">oooo</span>vyLists
			</h1>
			<div className="App">
				<SearchBar />
				<div className="App-playlist">
					<SearchResults />
					<Playlist />
				</div>
			</div>
		</div>
	);
}

export default App;
