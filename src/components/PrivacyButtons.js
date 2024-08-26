import React, { useState } from "react";
import "../App.css";
const green = "#1db954";
const lightgray = "#b3b3b3";
const darkgray = "#212121";

function PrivacyButtons({ setPrivacy }) {
	const handlePrivacyClick = (e) => {
		if (e.target.id === "ppleft") {
			setPrivacy("public");
			document.getElementById("ppleft").style["background-color"] = green;
			document.getElementById("ppleft").style["color"] = darkgray;
			document.getElementById("ppright").style["background-color"] =
				darkgray;
			document.getElementById("ppright").style["color"] = lightgray;
		} else {
			setPrivacy("private");
			document.getElementById("ppright").style["background-color"] =
				green;
			document.getElementById("ppright").style["color"] = darkgray;
			document.getElementById("ppleft").style["background-color"] =
				darkgray;
			document.getElementById("ppleft").style["color"] = lightgray;
		}
	};

	return (
		<div className="publicsetting">
			<p>Add to profile?</p>
			<div>
				<button
					className="ppbutton"
					id="ppleft"
					onClick={handlePrivacyClick}
				>
					Yes
				</button>
				<button
					className="ppbutton"
					id="ppright"
					onClick={handlePrivacyClick}
				>
					No
				</button>
			</div>
		</div>
	);
}

export default PrivacyButtons;
