import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.js";
import Container from "./components/Container.js";
import SaveButton from "./components/SaveButton.js";

function App() {
	const clientID = process.env.REACT_APP_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

	const [searchResults, setSearchResults] = useState([]);

	const [accessToken, setAccessToken] = useState("");
	useEffect(() => {
		async function getAccessToken() {
			const response = await fetch(
				"https://accounts.spotify.com/api/token",
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
					method: "POST",
				}
			);
			const json = await response.json();
			setAccessToken(json.access_token);
		}

		getAccessToken().catch(console.error);
	}, []);

	function handleSearch(value) {
		async function search(value) {
			const query = encodeURI(value);
			const uri = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=15`;
			try {
				const response = await fetch(uri, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				if (response.ok) {
					const json = await response.json();
					let array = [];
					json.tracks.items.forEach((track, index) => {
						let list = [];
						track.artists.forEach((artist) => {
							list.push(artist.name);
						});
						const artistsString = list.join(", ");
						array.push({
							title: track.name,
							artist: artistsString,
							album: track.album.name,
							albumCover: track.album.images[0].url,
							id: index,
						});
					});
					setSearchResults(array);
				}
			} catch (error) {
				console.log(error);
			}
		}
		search(value);
	}

	return (
		<div className="app">
			<h1>Spotify Playlist Creator</h1>
			<SearchBar handleSearch={handleSearch} />
			<Container searchResults={searchResults} />
			<SaveButton />
		</div>
	);
}

export default App;
