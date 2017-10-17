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
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

import http from '../../../services/http.service';
import session from '../../../services/session.service';

const styles = StyleSheet.create({
	account: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	},
	back: {
		alignItems: 'center',
		flex: 1,
		height: 40,
		marginVertical: 10
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
	sport: {
		color: 'white',
		fontSize: 18,
		paddingVertical: 10
	},
	swipe: {
		borderBottomColor: 'white',
		borderBottomWidth: 0.5,
		marginVertical: 7,
	}
});

class Manage extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name='settings' size={30} />
	};

	constructor(props) {
		super(props);
		this.state = { data: [] };
	}

	componentDidMount() {
		http.get('/api/followings/get-followed-teams')
			.then(data => this.setState({ data: data }))
			.catch(error => console.log(error));
	}

	removeTeam = (item, index) => {
		http.delete(`/api/followings/${item.sport}/${item.team}`)
			.then(() => {
				const data = this.state.data.slice();
				data.splice(index, 1);
				this.setState({ data: data });
			}).catch(error => console.log(error));
	}

	render() {
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

				<View style={{ flex: 10 }}>
					<View style={{ flex: 9 }}>
						<FlatList
							data={this.state.data}
							keyExtractor={(item, index) => `${index}`}
							renderItem={({ item, index }) => (
								<Swipeout
									backgroundColor='transparent'
									right={[{
										component: <Icon style={{ alignSelf: 'center' }} color='white' name='trash' size={30} />,
										onPress: () => this.removeTeam(item, index),
										type: 'delete'
									}]}
									style={styles.swipe}>
									<Text style={styles.sport}>{item.teamName}</Text>
								</Swipeout>
							)} />
					</View>

					<View style={styles.back}>
						{/* Logout */}
						<TouchableHighlight
							onPress={() => {
								session.logout();
								this.props.setMode(2);
							}}
							style={{ backgroundColor: '#31da5b', borderRadius: 5, padding: 10 }}
							underlayColor='#31da5b'>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text style={{ color: 'white' }}>Logout</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>

			</View >
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Manage);