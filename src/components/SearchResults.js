import React from "react";
import Song from "./Song.js";
import "../App.css";

function SearchResults({ searchResults, handleAdd }) {
	const listItems = searchResults.map((result, index) => {
		return (
			<Song
				title={result.title}
				artist={result.artist}
				album={result.album}
				albumCover={result.albumCover}
				key={index}
				id={result.id}
				buttonValue="+"
				buttonAction={handleAdd}
			/>
		);
	});

	return (
		<div className="tracklist">
			<h2>Search Results</h2>
			<div className="songscontainer">{listItems}</div>
		</div>
	);
}

export default SearchResults;
