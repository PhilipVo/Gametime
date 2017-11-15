import React, { Component } from 'react';
import {
	FlatList,
	Image,
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
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 12,
		fontWeight: 'bold',
		textAlign: 'center',
		textShadowColor: 'black',
		textShadowOffset: { width: 1, height: 1 }
	},
	logo: {
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 35,
		justifyContent: 'center',
		height: 70,
		width: 70
	},
	logos: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	row: {
		flexDirection: 'row',
		height: 150,
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
			.catch(() => { });
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
						<ImageBackground
							source={{ uri: `${http.s3}/${item.sport}/${item.sport}.png` }}
							style={styles.row}>
							<View style={{ alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
								<Image
									source={{ uri: `${http.s3}/${item.sport}/${item.sport}_logo.png` }}
									style={{ height: 50, resizeMode: 'contain', width: 50 }} />

								{
									item.away && item.sport !== 'Soccer' &&
									<Text style={styles.details}>
										{
											item.home +
											(item.away ? ` vs ${item.away}\n` : '\n')
										}
									</Text>
								}

								<Text style={styles.details}>
									{
										moment(item.gametime).calendar() +
										(item.network ? ` on ${item.network}` : '')
									}
								</Text>
							</View>

							{
								// Logos (only for Baseball, Basketball, Football, and Hockey):
								item.away && item.sport !== 'Soccer' ?
									<View style={styles.logos}>
										{/* Home Team Logo */}
										<View style={styles.logo}>
											<Image
												style={{ width: 60, height: 60 }}
												source={{ uri: `${http.s3}/${item.sport}/${item.home.replace(/\s/g, '+')}.png` }} />
										</View>

										{/* Away Team Logo */}
										<View style={styles.logo}>
											<Image
												style={{ width: 60, height: 60 }}
												source={{ uri: `${http.s3}/${item.sport}/${item.away.replace(/\s/g, '+')}.png` }} />
										</View>
									</View> :

									// Else just display event name:
									<View style={styles.logos}>
										<Text style={[styles.details, { fontSize: 16 }]}>
											{
												item.home +
												(item.away ? ` vs  ${item.away}\n` : '\n')
											}
										</Text>
									</View>
							}
						</ImageBackground>
					)} />
			</View>
		);
	}
}

export default connect()(Feed);