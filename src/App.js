import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.js";
import Container from "./components/Container.js";
import SaveButton from "./components/SaveButton.js";
import hitmehardandsoft from "./components/imgs/hitmehardandsoft.png";

function App() {
	const [searchResults, setSearchResults] = useState([
		{
			title: "CHIHIRO",
			artist: "Billie Eilish",
			album: "Hit Me Hard And Soft",
			albumCover: hitmehardandsoft,
		},
		{
			title: "Birds of a Feather",
			artist: "Billie Eilish",
			album: "Hit Me Hard And Soft",
			albumCover: hitmehardandsoft,
		},
	]);

	return (
		<div className="app">
			<h1>Spotify Playlist Creator</h1>
			<SearchBar />
			<Container searchResults={searchResults} />
			<SaveButton />
		</div>
	);
}

export default App;
