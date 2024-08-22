import React from "react";
import disc from "./imgs/disc.png";
import "../App.css";

function Song({
	title,
	artist,
	album,
	albumCover,
	buttonValue,
	buttonAction,
	id,
}) {
	const handleButtonPress = () => {
		buttonAction(id);
	};

	return (
		<div className="song">
			<div className="songcontainer">
				<img className="albumcover" src={albumCover} />
				<div className="songdata">
					<p className="title">{title}</p>
					<p className="artist">{artist}</p>
					<div className="album">
						<img id="disc" src={disc} />
						<p>{album}</p>
					</div>
				</div>
			</div>
			<button className="addbutton" onClick={handleButtonPress}>
				{buttonValue}
			</button>
		</div>
	);
}

export default Song;
