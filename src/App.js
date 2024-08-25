import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.js";
import Container from "./components/Container.js";
import Options from "./components/Options.js";

function App() {
	const clientID = process.env.REACT_APP_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

	const [searchResults, setSearchResults] = useState([]);
	useEffect(() => {
		if (searchResults.length) {
			localStorage.setItem(
				"searchResults",
				JSON.stringify(searchResults)
			);
		}
	}, [searchResults]);

	useEffect(() => {
		const storage = JSON.parse(localStorage.getItem("searchResults"));
		if (storage) {
			setSearchResults(storage);
		}
	}, []);

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
				body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=https%3A%2F%2Fspotify-playlistcreator.netlify.app%2F`,
			})
				.then((res) => res.json())
				.then((res) => setAccessToken(res.access_token))
				.catch(console.error);
		}
	}, [authorizationCode]);

	useEffect(() => {
		if (authorizationCode) {
			document.getElementsByClassName("optionscontainer")[0].style[
				"flex-direction"
			] = "row";
			document.getElementsByClassName("titleeditor")[0].style["display"] =
				"flex";
			document.getElementsByClassName("buttons")[0].style["width"] =
				"24rem";
			document.getElementsByClassName("publicsetting")[0].style[
				"display"
			] = "block";
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
							uri: track.uri,
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
			const redirectURI = "https://spotify-playlistcreator.netlify.app/";
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
			<Options auth={authorizationCode} handleClick={handleClick} />
		</div>
	);
}

export default App;
