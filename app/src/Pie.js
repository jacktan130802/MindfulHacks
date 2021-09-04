import React from 'react';
import colors from './moods.json';

import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { ShareOutlined } from '@material-ui/icons';

import Firebase from 'firebase';

class Pie extends React.Component {

	constructor(props) {
		super(props);

		this.moods = [];
		this.state = {
			data: {

			},
			config: {

			}
		};
	}

	async fetchData() {
		var ref = Firebase.database().ref("/");
		await ref.get().then(snap => {
			this.setState({ data: snap.val()["moods"] });
		});
	}

	async setConfig() {
		await this.fetchData();

		for (var d in this.state.data)
			this.moods.push(this.state.data[d].mood);

		var chartData = [];
		var backgroundColor = [];

		for (var m in colors) {
			backgroundColor.push(colors[m]);
			chartData.push(this.moods.filter(o => o === m).length);
		}

		this.setState({
			config: {
				datasets: [
					{
						data: chartData,
						backgroundColor: backgroundColor,
					}
				],
				labels: Object.keys(colors),
			}
		});
	}

	componentDidMount() {
		(async () => {
			await this.setConfig();
		})();
	}

	render() {
		return (
			<div id="pie">
				<h2>Mood Chart</h2>
				<MDBContainer>
					<Doughnut data={this.state.config} options={{ responsive: true }} />
				</MDBContainer>
				<ShareOutlined style={{ width: 40, height: 40, marginTop: 70 }}></ShareOutlined>
			</div>
		);
	}
}

export default Pie;
