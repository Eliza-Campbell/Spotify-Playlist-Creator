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
	const [authorizationCode, setAuthorizationCode] = useState("");

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

		if (!authorizationCode || !accessToken) {
			getAccessToken().catch(console.error);
		} else {
			const authorization =
				"Basic " + window.btoa(clientID + ":" + clientSecret);
			fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					Authorization: `${authorization}`,
				},
				body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`,
			})
				.then((res) => res.json())
				.then((res) => setAccessToken(res.access_token))
				.catch(console.error);
		}
	}, [authorizationCode]);

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

	useEffect(() => {
		const uri = window.location.href;
		if (uri.includes("code")) {
			const startIndex = uri.indexOf("=");
			const endIndex = uri.indexOf("&");
			setAuthorizationCode(uri.slice(startIndex + 1, endIndex));
		}
	}, []);

	const handleClick = () => {
		if (!authorizationCode) {
			const state = Math.floor(Math.random() * 100000).toString();
			const redirectURI = "http://localhost:3000/";
			window.location.replace(
				`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=playlist-modify-public%20playlist-modify-private&redirect_uri=${redirectURI}&state=${state}`
			);
		}
	};

	return (
		<div className="app">
			<h1>Spotify Playlist Creator</h1>
			<SearchBar handleSearch={handleSearch} />
			<Container searchResults={searchResults} />
			<SaveButton handleClick={handleClick} />
		</div>
	);
}

export default App;
