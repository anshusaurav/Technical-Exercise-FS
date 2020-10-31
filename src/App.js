import React, { Component } from "react";
import "./App.css";
import Upload from "./Components/Upload"
import './tailwind.output.css';
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
	render() {
		return (
			<div className="App">
				<Upload />
			</div>
		);
	}
}

export default App;
