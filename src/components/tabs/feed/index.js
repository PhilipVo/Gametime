import React, { Component } from 'react';
import {
	FlatList,
	ImageBackground,
	RefreshControl,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';
import moment from 'moment';

import http from '../../../services/http.service';

const styles = StyleSheet.create({
	details: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		color: 'white',
		fontSize: 12,
		textAlign: 'center'
	},
	row: {
		flexDirection: 'row',
		height: 120,
		marginBottom: 1
	}
});

class Feed extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name='clock' size={30} />
	};

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			refreshing: false
		};
	}

	componentDidMount = () => {
		http.get('/api/games/get-my-games')
			.then(data => this.setState({ data: data }))
			.catch(error => console.log(error));
	}

	onRefresh = () => {
		if (!this.state.refreshing) {
			this.setState({ refreshing: true });
			http.get('/api/games/get-my-games')
				.then(data => this.setState({ data: data, refreshing: false }))
				.catch(() => { });
		}
	}

	render() {
		return (
			<View style={{ backgroundColor: 'black', flex: 1, paddingTop: 20 }}>

				<FlatList
					data={this.state.data}
					keyExtractor={(item, index) => `${index}`}
					refreshControl={
						<RefreshControl
							enabled={!this.state.refreshing}
							onRefresh={this.onRefresh}
							refreshing={this.state.refreshing}
							size={RefreshControl.SIZE.SMALL} />
					}
					renderItem={({ item }) => (
						<ImageBackground source={images[item.sport]} style={styles.row}>
							<View style={{ flex: 2 }}>
								<Text style={styles.details}>
									{
										item.home +
										(item.away ? ` vs  ${item.away}\n` : '\n') +
										moment(item.gametime).calendar() +
										(item.network ? ` on ${item.network}` : '')
									}
								</Text>
							</View>

							{/* Home Team Logo */}
							<View style={{ flex: 1 }}>

							</View>

							{/* Away Team Logo */}
							<View style={{ flex: 1 }}>

							</View>
						</ImageBackground>
					)} />
			</View>
		);
	}
}

const images = {
	Baseball: require('../../../../assets/images/baseball.png'),
	Basketball: require('../../../../assets/images/basketball.png'),
	Football: require('../../../../assets/images/football.png'),
	Hockey: require('../../../../assets/images/hockey.png'),
	MMA: require('../../../../assets/images/mma.png'),
	NASCAR: require('../../../../assets/images/nascar.png'),
	Soccer: require('../../../../assets/images/soccer.png')
};

export default connect()(Feed);