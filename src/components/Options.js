import React from "react";
import "../App.css";
import TitleEditor from "./TitleEditor.js";
import ButtonsContainer from "./ButtonsContainer.js";

function Options({ handleClick, auth, postPlaylist, setTitle }) {
	return (
		<div className="optionscontainer">
			<TitleEditor setTitle={setTitle} />
			<ButtonsContainer
				postPlaylist={postPlaylist}
				auth={auth}
				handleClick={handleClick}
			/>
		</div>
	);
}

export default Options;
