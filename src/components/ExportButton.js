import React from "react";
import "../App.css";

function ExportButton({ text, handleClick }) {
	return (
		<button onClick={handleClick} className="savebutton">
			{text}
		</button>
	);
}

export default ExportButton;
