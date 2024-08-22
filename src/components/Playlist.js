import React from "react";
import Song from "./Song.js";
import "../App.css";

function Playlist({ playlist, handleRemove }) {
	const listItems = playlist.map((track, index) => {
		return (
			<Song
				title={track.title}
				artist={track.artist}
				album={track.album}
				albumCover={track.albumCover}
				key={index}
				id={track.id}
				buttonValue="-"
				buttonAction={handleRemove}
			/>
		);
	});

	return (
		<div className="tracklist">
			<h2>Playlist</h2>
			<div className="songscontainer">{listItems}</div>
		</div>
	);
}

export default Playlist;
