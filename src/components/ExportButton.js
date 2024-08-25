import React from "react";
import "../App.css";

function ExportButton({ text, handleClick, postPlaylist, auth }) {
	const handleButtonClick = () => {
		if (auth) {
			postPlaylist();
		} else {
			handleClick();
		}
	};

	return (
		<button onClick={handleButtonClick} className="savebutton">
			{text}
		</button>
	);
}

export default ExportButton;
