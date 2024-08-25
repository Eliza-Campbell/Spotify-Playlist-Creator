import React from "react";
import "../App.css";
import TitleEditor from "./TitleEditor.js";
import ButtonsContainer from "./ButtonsContainer.js";

function Options({ handleClick, auth }) {
	return (
		<div className="optionscontainer">
			<TitleEditor />
			<ButtonsContainer auth={auth} handleClick={handleClick} />
		</div>
	);
}

export default Options;
