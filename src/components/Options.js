import React from "react";
import "../App.css";
import TitleEditor from "./TitleEditor.js";
import ButtonsContainer from "./ButtonsContainer.js";

function Options({ handleClick, auth, postPlaylist, setTitle, setPrivacy }) {
	return (
		<div className="optionscontainer">
			<TitleEditor setTitle={setTitle} />
			<ButtonsContainer
				setPrivacy={setPrivacy}
				postPlaylist={postPlaylist}
				auth={auth}
				handleClick={handleClick}
			/>
		</div>
	);
}

export default Options;
