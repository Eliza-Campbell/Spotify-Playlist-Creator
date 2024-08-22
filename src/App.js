import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.js";
import Container from "./components/Container.js";
import SaveButton from "./components/SaveButton.js";

function App() {
	return (
		<div className="app">
			<h1>Spotify Playlist Creator</h1>
			<SearchBar />
			<Container />
			<SaveButton />
		</div>
	);
}

export default App;
