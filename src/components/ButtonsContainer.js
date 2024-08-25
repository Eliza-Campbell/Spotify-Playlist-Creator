import React from "react";
import "../App.css";
import PrivacyButtons from "./PrivacyButtons.js";
import ExportButton from "./ExportButton.js";

function ButtonsContainer({ auth, handleClick }) {
	return (
		<div className="buttons">
			<PrivacyButtons />
			<ExportButton
				text={[!auth ? "Authorise Spotify" : "Export Playlist"]}
				handleClick={handleClick}
			/>
		</div>
	);
}

export default ButtonsContainer;
