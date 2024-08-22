import React, { useEffect, useState } from "react";
import magnifyingGlass from "./imgs/magnifying-glass.png";

function SearchBar({ handleSearch }) {
	const [text, setText] = useState("");

	const handleClick = () => {
		if (text) {
			handleSearch(text);
		}
	};

	useEffect(() => {
		const handleEnter = (e) => {
			if (e.key === "Enter" && text) {
				handleSearch(text);
			}
		};
		window.addEventListener("keypress", handleEnter);
		return () => {
			window.removeEventListener("keypress", handleEnter);
		};
	}, [text]);

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
