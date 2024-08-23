import React, { useState } from "react";

function SaveButton({ handleClick, auth }) {
	const [title, setTitle] = useState("");

	return (
		<div className="savebuttoncontainer">
			<input
				className="titleeditor"
				type="text"
				placeholder="Enter playlist title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			></input>
			<button onClick={handleClick} className="savebutton">
				{[!auth ? "Authorise Spotify" : "Export Playlist"]}
			</button>
		</div>
	);
}

export default SaveButton;
