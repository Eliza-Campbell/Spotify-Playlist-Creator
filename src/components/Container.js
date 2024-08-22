import React from "react";
import "../App.css";
import SearchResults from "./SearchResults.js";
import Playlist from "./Playlist.js";

function Container() {
	return (
		<div className="maincontainer">
			<SearchResults />
			<Playlist />
		</div>
	);
}

export default Container;
