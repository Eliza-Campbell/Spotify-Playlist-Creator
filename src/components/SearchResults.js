import React from "react";
import Song from "./Song.js";
import "../App.css";

function SearchResults() {
	return (
		<div className="searchresults">
			<h2 className="searchresultstitle">Search Results</h2>
			<div className="songscontainer">
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

export default SearchResults;
