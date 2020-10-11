import React from 'react';
import Track from '../Track/Track';

function TrackList(props) {
	return (
		<div className="TrackList">
			{props.tracks.map((track) => {
				return (
					<Track
						name={track.name}
						artist={track.artist}
						album={track.album}
						id={track.id}
					/>
				);
			})}
		</div>
	);
}

export default TrackList;
