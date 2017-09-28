import React, { Component } from 'react';
import {
	Dimensions,
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
					<Text style={styles.account}>Account information</Text>
				</View>


				{/* Body */}
				<View style={{ flex: 10 }}>
					<View style={styles.row}>
						<Text style={styles.title}>Email</Text>
						<Text style={styles.title}>sample@gmail.com</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.title}>Sports following</Text>
						<Text style={styles.title}>{sportsCount}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.title}>Teams following</Text>
						<Text style={styles.title}>{teamsCount}</Text>
					</View>
					<View style={styles.row}>
						<Text style={styles.title}>Mute notifications</Text>
						<FAIcon color='white' name='square-o' size={30} style={{ backgroundColor: 'transparent' }} />
					</View>

					{/* Logout */}
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