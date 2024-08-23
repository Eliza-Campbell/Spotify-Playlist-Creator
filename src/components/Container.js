import React, { useEffect, useState } from "react";
import "../App.css";
import SearchResults from "./SearchResults.js";
import Playlist from "./Playlist.js";

function Container({ searchResults }) {
	const [playlist, setPlaylist] = useState([]);

	useEffect(() => {
		if (playlist.length) {
			localStorage.setItem("playlist", JSON.stringify(playlist));
		}
	}, [playlist]);

	useEffect(() => {
		const storage = JSON.parse(localStorage.getItem("playlist"));
		if (storage) {
			setPlaylist(storage);
		}
	}, []);

	const [songId, setSongId] = useState(0);
	const handleAdd = (id) => {
		const index = searchResults.findIndex((result) => {
			return result.id === id;
		});
		const song = { ...searchResults[index], id: songId };
		setPlaylist([...playlist, song]);
		setSongId(songId + 1);
	};

	const handleRemove = (id) => {
		setPlaylist(
			playlist.filter((song) => {
				return song.id !== id;
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
