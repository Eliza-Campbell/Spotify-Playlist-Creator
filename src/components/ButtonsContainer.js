import React from "react";
import "../App.css";
import PrivacyButtons from "./PrivacyButtons.js";
import ExportButton from "./ExportButton.js";

function ButtonsContainer({ auth, handleClick, postPlaylist, setPrivacy }) {
	return (
		<div className="buttons">
			<PrivacyButtons setPrivacy={setPrivacy} />
			<ExportButton
				text={[!auth ? "Authorise Spotify" : "Export"]}
				handleClick={handleClick}
				postPlaylist={postPlaylist}
				auth={auth}
			/>
		</div>
	);
}

export default ButtonsContainer;
