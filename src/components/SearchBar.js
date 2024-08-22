import React, { useState } from "react";
import magnifyingGlass from "./imgs/magnifying-glass.png";

function SearchBar({ handleSearch }) {
	const [text, setText] = useState("");

	const handleClick = () => {
		if (text) {
			handleSearch(text);
		}
	};

	return (
		<div className="searchbar">
			<img src={magnifyingGlass} onClick={handleClick} />
			<input
				id="search"
				type="text"
				placeholder="Search Spotify"
				value={text}
				onChange={(e) => setText(e.target.value)}
			></input>
		</div>
	);
}

export default SearchBar;
