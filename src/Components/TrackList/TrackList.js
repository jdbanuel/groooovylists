import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

function TrackList(props) {
	return (
		<div className="TrackList">
			{props.tracks.map((track) => {
				return (
					<Track className="Track"
						name={track.name}
						artist={track.artist}
						album={track.album}
						id={track.id}
						key={track.id}
						onAdd={props.onAdd}
						onRemove={props.onRemove}
						isRemoval={props.isRemoval}
					/>
				);
			})}
		</div>
	);
}

export default TrackList;
