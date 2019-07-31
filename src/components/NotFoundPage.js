import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<div className="jumbotron">
			<h1>Page Not Found</h1>
			<p>
				<Link to="/">Back to Home</Link>
			</p>
		</div>
	);
}

export default HomePage;
