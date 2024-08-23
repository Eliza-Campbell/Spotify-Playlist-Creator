import React from "react";

function SaveButton({ handleClick }) {
	return (
		<div className="savebuttoncontainer">
			<button onClick={handleClick} className="savebutton">
				Save to spotify
			</button>
		</div>
	);
}

export default SaveButton;
