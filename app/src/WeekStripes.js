import React from 'react';
import colors from './moods.json';

import { MDBContainer } from "mdbreact";
import { ShareOutlined } from '@material-ui/icons';

import Firebase from 'firebase';

function Week(props) {
	var colors = ["#e06666", "#93c47d", "#c27ba0", "#ffd966", "#f3f0e1", "#6d9eeb", "#f6b26b"];
	var color = props.color === undefined ? colors[Math.floor(Math.random() * colors.length)] : props.color;

	return (
		<div class="week">
			<span style={{ backgroundColor: color, padding: 100 }}></span>
			<h3>{props.day}</h3>
		</div>
	);
}

class WeekStripes extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			data: {},
			day: "Monday"
		};
		this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	}

	componentDidMount() {
	}

	// async fetchData() {
	// 	var ref = Firebase.database().ref("/");
	// 	await ref.get().then(snap => {
	// 		this.setState({ data: Object.values(snap.val()["moods"]) });
	// 	});
	// }

	// async newDay() {
	// 	var ref = Firebase.database().ref("/");
	// 	await ref.get().then(snap => {
	// 		this.setState({ data: snap.val()["moods"] });
	// 	});

	// 	this.state.data 

	// 	var ref = Firebase.database().ref("/moods");
	// 	ref.remove();
	// }

	render() {

		return (
			<div id="weekly">
				<h2>My Weekly Stripes</h2>
				<MDBContainer className="stripe-container">
					<div className="week-container">
						<Week day="Monday"></Week>
						<Week day="Tuesday"></Week>
						<Week day="Wednesday"></Week>
						<Week day="Thursday"></Week>
						<Week day="Friday"></Week>
						<Week day="Saturday"></Week>
						<Week day="Sunday"></Week>
					</div>
				</MDBContainer>
				<span style={{ fontSize: 10 }}>* This is an example</span>
				<br />
				<ShareOutlined style={{ width: 40, height: 40, marginTop: 70 }}></ShareOutlined>
			</div>
		);
	}
}

export default WeekStripes;
