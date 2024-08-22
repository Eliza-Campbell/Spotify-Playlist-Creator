import React, { useState } from "react";
import "../App.css";
import SearchResults from "./SearchResults.js";
import Playlist from "./Playlist.js";

function Container({ searchResults }) {
	const [playlist, setPlaylist] = useState([]);

	const handleAdd = (id) => {
		const index = searchResults.findIndex((result) => {
			return result.id === id;
		});
		setPlaylist([...playlist, searchResults[index]]);
	};

	const handleRemove = (id) => {
		const index = playlist.findLastIndex((song) => {
			return id === song.id;
		});
		setPlaylist(
			playlist.filter((song, i) => {
				return index !== i;
			})
		);
	};

	return (
		<div className="maincontainer">
			<SearchResults
				searchResults={searchResults}
				handleAdd={handleAdd}
			/>
			<Playlist playlist={playlist} handleRemove={handleRemove} />
		</div>
	);
}

export default Container;
