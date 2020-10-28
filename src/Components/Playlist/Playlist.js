import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {
	return (
		<div className="Playlist">
			<input defaultValue={'New Playist'} />
			<TrackList tracks={props.tracklist} onAdd={props.onAdd} isRemoval={false} />
			<button className="Playlist-save">SAVE TO SPOTIFY</button>
		</div>
	);
}

export default Playlist;
