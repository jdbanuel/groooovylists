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
						key={track.id}
					/>
				);
			})}
		</div>
	);
}

export default TrackList;
