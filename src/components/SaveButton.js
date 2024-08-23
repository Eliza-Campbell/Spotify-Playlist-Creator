import React from "react";

function SaveButton({ handleClick, auth }) {
	return (
		<div className="savebuttoncontainer">
			<button onClick={handleClick} className="savebutton">
				{[!auth ? "Authorise Spotify" : "Export Playlist"]}
			</button>
		</div>
	);
}

export default SaveButton;
