import React, { useState } from "react";

function TitleEditor() {
	const [title, setTitle] = useState("");

	return (
		<input
			className="titleeditor"
			type="text"
			placeholder="Enter playlist title"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
		></input>
	);
}

export default TitleEditor;
