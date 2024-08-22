import React from "react";
import Song from "./Song.js";
import "../App.css";

function Tracklist({ type }) {
	return (
		<div className="tracklist">
			<h2>{type}</h2>
			<div className="songscontainer">
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
				<Song buttonValue={[type === "Search Results" ? "+" : "X"]} />
			</div>
		</div>
	);
}

export default Tracklist;
