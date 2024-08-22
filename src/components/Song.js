import React from "react";
import hitmehardandsoft from "./imgs/hitmehardandsoft.png";
import disc from "./imgs/disc.png";
import "../App.css";

function Song() {
	return (
		<div className="song">
			<div className="songcontainer">
				<img className="albumcover" src={hitmehardandsoft} />
				<div className="songdata">
					<p className="title">CHIHIRO</p>
					<p className="artist">Billie Eilish</p>
					<div className="album">
						<img id="disc" src={disc} />
						<p>Hit Me Hard And Soft</p>
					</div>
				</div>
			</div>
			<button className="addbutton">+</button>
		</div>
	);
}

export default Song;
