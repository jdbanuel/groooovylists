import React from 'react';
import './Track.css';

function Track(props) {
	let isRemoval = false;

	function renderAction() {
		if (!isRemoval) {
			return <button className="Track-action">+</button>;
		} else {
			return <button className="Track-action">-</button>;
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
