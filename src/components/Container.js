import React from "react";
import "../App.css";
import Tracklist from "./Tracklist.js";

function Container() {
	return (
		<div className="maincontainer">
			<Tracklist type="Search Results" />
			<Tracklist type="Playlist" />
		</div>
	);
}

export default Container;
