import React from 'react';
import Pie from './Pie';
import Stripes from './Stripes';

import Firebase from 'firebase';
import 'firebase/database';
import config from "./config";

class App extends React.Component {

	constructor(props) {
		super(props);

		if (!Firebase.apps.length) {
			Firebase.initializeApp(config);
		} else {
			Firebase.app();
		}
	}

	// For demo purposes only
	resetStripes() {
		var ref = Firebase.database().ref("/moods");
		ref.remove();

		window.location.reload();
	}

	render() {

		return (
			<div>
				<h1>Mood Dashboard</h1>
				<div id="dashboard">
					<Stripes></Stripes>
					<Pie></Pie>
				</div>
				<div id="buttons">
					<button type="button" class="btn btn-primary" onClick={() => this.resetStripes()}>Reset</button>
				</div>

			</div>
		);
	}
}

export default App;
