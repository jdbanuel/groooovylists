import React from 'react';
import './Track.css';

function Track(props) {

	function addTrack() {
		props.onAdd({name: props.name, artist: props.artist, album: props.album, id: props.id});
	}

	function removeTrack() {
		props.onRemove({name: props.name, artist: props.artist, album: props.album, id: props.id});
	}

	function renderAction() {
		if (!props.isRemoval) {
			return <button className="Track-action" onClick={addTrack}>+</button>;
		} else {
			return <button className="Track-action" onClick={removeTrack}>-</button>;
		}
	}
	return (
		<div className="Track">
			<div className="Track-information">
				<h3> {props.name} </h3>
				<p>
					{props.artist} | {props.album}
				</p>
			</div>
			{renderAction()}
		</div>
	);
}

export default Track;
