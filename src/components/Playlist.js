import React from "react";
import Song from "./Song.js";

function Playlist() {
	return (
		<div className="playlist">
			<h2>Playlist</h2>
			<div className="playlistcontainer">
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
				<Song />
			</div>
		</div>
	);
}

export default Playlist;
