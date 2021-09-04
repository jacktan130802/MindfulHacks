import React from 'react';
import colors from './moods.json';

import { MDBContainer } from "mdbreact";
import { ShareOutlined } from '@material-ui/icons';

import Firebase from 'firebase';

class Stripes extends React.Component {

	constructor(props) {
		super(props);

		this.moods = [];
		this.state = {
			data: {}
		};
	}

	componentDidMount() {
		(async () => await this.fetchData())();
	}

	async fetchData() {
		var ref = Firebase.database().ref("/");
		await ref.get().then(snap => {
			this.setState({ data: Object.values(snap.val()["moods"]) });
		});
	}

	render() {
		return (
			<div id="line">
				<h2>My Colors</h2>
				<MDBContainer className="stripe-container">
					{
						Object.values(this.state.data).map(i => {
							return <span className="stripe" style={{ backgroundColor: colors[i.mood] }}></span>
						})
					}
				</MDBContainer>
				<ShareOutlined style={{ width: 40, height: 40, marginTop: 70 }}></ShareOutlined>
			</div>
		);
	}
}

export default Stripes;
