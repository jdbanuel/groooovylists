import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {
	return (
		<div className="Playlist">
			<input value={props.playlistName} onChange={props.handleChange} />
			<TrackList tracks={props.tracklist} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={true} />
			<button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
		</div>
	);
}

export default Playlist;
