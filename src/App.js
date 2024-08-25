import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.js";
import Container from "./components/Container.js";
import Options from "./components/Options.js";

function App() {
	const clientID = process.env.REACT_APP_CLIENT_ID;
	const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

	const [searchResults, setSearchResults] = useState([]);
	// retrieves and handles localStorage for searchResults
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
	//create new access token when page renders
	useEffect(() => {
		fetch("https://accounts.spotify.com/api/token", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`,
			method: "POST",
		})
			.then((res) => res.json())
			.then((res) => setAccessToken(res.access_token))
			.catch(console.error);
	}, []);

	const [authorizationCode, setAuthorizationCode] = useState("");
	//handles request for authorization
	const handleClick = () => {
		if (!authorizationCode) {
			const state = Math.floor(Math.random() * 100000).toString();
			const redirectURI = "https://spotify-playlistcreator.netlify.app/";
			// const redirectURI = "http://localhost:3000/";
			window.location.replace(
				`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientID}&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&redirect_uri=${redirectURI}&state=${state}`
			);
		}
	};

	//checks if authorized on each render
	useEffect(() => {
		const uri = window.location.href;
		if (uri.includes("code")) {
			const startIndex = uri.indexOf("=");
			const endIndex = uri.indexOf("&");
			setAuthorizationCode(uri.slice(startIndex + 1, endIndex));
		}
	}, []);

	const [userId, setUserId] = useState("");
	//once authorized, swap bearer token for access_token, set userId
	useEffect(() => {
		if (authorizationCode) {
			const authorization =
				"Basic " + window.btoa(clientID + ":" + clientSecret);
			fetch("https://accounts.spotify.com/api/token", {
				method: "POST",
				headers: {
					"content-type": "application/x-www-form-urlencoded",
					Authorization: `${authorization}`,
				},
				body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=https%3A%2F%2Fspotify-playlistcreator.netlify.app%2F`,
				// body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F`,
			})
				.then((res) => res.json())
				.then((res) => {
					fetch("https://api.spotify.com/v1/me", {
						headers: {
							Authorization: `Bearer ${res.access_token}`,
						},
					})
						.then((res) => res.json())
						.then((res) => setUserId(res.id))
						.catch(console.error);
					setAccessToken(res.access_token);
				})
				.catch(console.error);
		}
	}, [authorizationCode]);

	//change CSS layout of page once authorised
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

	//GET request for search results
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
