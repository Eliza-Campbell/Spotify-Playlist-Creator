import React, { useState } from "react";

const green = "#1db954";
const lightgray = "#b3b3b3";
const darkgray = "#212121";

function SaveButton({ handleClick, auth }) {
	const [title, setTitle] = useState("");
	const [privacy, setPrivacy] = useState("public");

	const handlePrivacyClick = (e) => {
		if (e.target.id === "ppleft") {
			setPrivacy("public");
		} else {
			setPrivacy("private");
		}
	};

	return (
		<div
			className="savebuttoncontainer"
			style={{ flexDirection: [auth ? "row" : "row-reverse"] }}
		>
			<input
				className="titleeditor"
				type="text"
				placeholder="Enter playlist title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				style={{ display: [auth ? "flex" : "none"] }}
			></input>
			<div
				className="buttons"
				style={{ width: [auth ? "24rem" : "fit-content"] }}
			>
				<div
					className="publicsetting"
					style={{ display: [auth ? "block" : "none"] }}
				>
					<button
						className="ppbutton"
						id="ppleft"
						onClick={handlePrivacyClick}
						style={{
							backgroundColor: [
								privacy === "public" ? green : darkgray,
							],
							color: [
								privacy === "public" ? darkgray : lightgray,
							],
						}}
					>
						Public
					</button>
					<button
						className="ppbutton"
						id="ppright"
						onClick={handlePrivacyClick}
						style={{
							backgroundColor: [
								privacy === "private" ? green : darkgray,
							],
							color: [
								privacy === "private" ? darkgray : lightgray,
							],
						}}
					>
						Private
					</button>
				</div>
				<button onClick={handleClick} className="savebutton">
					{[!auth ? "Authorise Spotify" : "Export Playlist"]}
				</button>
			</div>
		</div>
	);
}

export default SaveButton;
