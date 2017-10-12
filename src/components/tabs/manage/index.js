import React, { Component } from 'react';
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { connect } from 'react-redux';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

import session from '../../../services/session.service';

const styles = StyleSheet.create({
	account: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	},
	background: {
		height: Dimensions.get('window').height,
		position: 'absolute',
		width: Dimensions.get('window').width
	},
	gametime: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 40,
		textAlign: 'center'
	},
	logout: {
		alignSelf: 'center',
		backgroundColor: 'transparent',
		borderColor: 'white',
		borderRadius: 5,
		borderWidth: 0.5,
		color: 'white',
		fontSize: 20,
		padding: 5,
		textAlign: 'center'
	},
	row: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	select: {
		alignItems: 'center',
		backgroundColor: 'rgba(49,218,91,0.4)',
		borderRadius: 5,
		flex: 1,
		flexDirection: 'row',
		height: 40,
		justifyContent: 'space-between'
	},
	title: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	}
});

class Manage extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name='settings' size={30} />
	};

	componentWillMount = () => {
		this.setState({
			data: [
				{ sport: 'football' },
				{ sport: 'basketball' },
				{ sport: 'mma' },
				{ sport: 'soccer' },
				{ sport: 'baseball' },
				{ sport: 'mma' },
				{ sport: 'soccer' },
				{ sport: 'baseball' },
			]
		});
	}

	render() {
		let sportsCount = 0;
		let teamsCount = 0;

		Object.values(this.props.sports).forEach(sport => {
			if (sport.length > 0) sportsCount += 1;
			teamsCount += sport.length;
		});

		return (
			<View style={{ flex: 1, padding: 20 }}>
				<Image
					source={require('../../../../assets/images/background2.png')}
					style={styles.background} />


				{/* Header */}
				<View style={{ flex: 2 }}>
					<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
						<Image
							source={require('../../../../assets/images/gametime.png')}
							style={{ height: 40, width: 40 }} />
						<Text style={styles.gametime}> Gametime</Text>
					</View>
					<Text style={styles.account}>Manage teams</Text>
				</View>

				{/* Body */}
				<View style={{ flex: 9 }}>
					<FlatList
						data={this.state.data}
						keyExtractor={(item, index) => `${index}`}
						renderItem={({ item }) => (
							<Text>
								placeholder
						</Text>
						)}
						style={{ flex: 9 }} />
				</View>

				{/* Logout */}
				<View style={{ flex: 1 }}>
					<Text
						onPress={() => {
							session.logout();
							this.props.setMode(2);
						}}
						style={styles.logout}>
						Logout
						</Text>
				</View>

			</View >
		);
	}
}

const mapStateToProps = state => ({
	sports: state.sports
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);