import React from "react";

function TitleEditor({ setTitle }) {
	return (
		<div className="titleeditor">
			<input
				type="text"
				placeholder="Enter playlist title"
				onChange={(e) => setTitle(e.target.value)}
			></input>
		</div>
	);
}

export default TitleEditor;
