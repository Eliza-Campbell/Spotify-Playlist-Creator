import React, { useEffect, useState } from "react";
import "../App.css";
import SearchResults from "./SearchResults.js";
import Playlist from "./Playlist.js";

function Container({ searchResults, handleAdd, handleRemove, playlist }) {
	return (
		<div className="maincontainer">
			<SearchResults
				searchResults={searchResults}
				handleAdd={handleAdd}
			/>
			<Playlist playlist={playlist} handleRemove={handleRemove} />
		</div>
	);
}

export default Container;
