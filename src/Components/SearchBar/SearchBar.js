import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar(props) {
	const [searchTerm, setSearchTerm] = useState('');

	function search() {
		props.onSearch(searchTerm);
	}

	function handleTermChange(event) {
		setSearchTerm(event.target.value);
		event.preventDefault();
	}

	return (
		<div className="SearchBar">
			<input placeholder="Enter A Song, Album, or Artist" value={searchTerm} onChange={handleTermChange}/>
			<button className="SearchButton" onClick={search}>SEARCH</button>
		</div>
	);
}

export default SearchBar;
