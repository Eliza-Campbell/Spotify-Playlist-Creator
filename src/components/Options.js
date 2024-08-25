import React from "react";
import "../App.css";
import TitleEditor from "./TitleEditor.js";
import ButtonsContainer from "./ButtonsContainer.js";

function Options({ handleClick, auth, postPlaylist }) {
	return (
		<div className="optionscontainer">
			<TitleEditor />
			<ButtonsContainer
				postPlaylist={postPlaylist}
				auth={auth}
				handleClick={handleClick}
			/>
		</div>
	);
}

export default Options;
