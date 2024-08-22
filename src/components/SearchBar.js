import React from "react";
import magnifyingGlass from "./imgs/magnifying-glass.png";

function SearchBar() {
	return (
		<div className="searchbar">
			<img src={magnifyingGlass} />
			<input id="search" type="text" placeholder="Search Spotify"></input>
		</div>
	);
}

export default SearchBar;
