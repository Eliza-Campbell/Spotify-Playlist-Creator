import React, { useState } from "react";

function TitleEditor() {
	const [title, setTitle] = useState("");

	return (
		<div className="titleeditor">
			<input
				type="text"
				placeholder="Enter playlist title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			></input>
		</div>
	);
}

export default TitleEditor;
