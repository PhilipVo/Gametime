import React, { Component } from 'react';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from 'react-native';
import { connect } from 'react-redux';

import http from '../../services/http.service';

const styles = StyleSheet.create({
	back: {
		alignItems: 'flex-start',
		flex: 1,
		height: 40,
		marginVertical: 10
	},
	gametime: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 40,
		textAlign: 'center'
	},
	lets: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
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
	sport: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center'
	}
});

class Teams extends Component {
	componentWillMount() {
		console.log(this.props)
	}

	addTeam = team => {
		http.post('/api/teams/add', JSON.stringify({
			sport: this.props.sport,
			team: team
		})).then(() => {

		}).catch(() => { });
	}

	render() {
		return (
			<View style={{ flex: 1, padding: 20 }}>

				{/* Header */}
				<View style={{ flex: 2 }}>
					<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
						<Image
							source={require('../../../assets/images/gametime.png')}
							style={{ height: 40, width: 40 }} />
						<Text style={styles.gametime}> Gametime</Text>
					</View>
					<Text style={styles.lets}>Let's select your {this.props.sport} teams</Text>
				</View>


				{/* Body */}
				<View style={{ flex: 10 }}>
					<View style={{ flex: 9 }}>
						<FlatList
							data={this.props.teams}
							keyExtractor={(item, index) => `${index}`}
							renderItem={({ item }) => (
								<TouchableHighlight
									onPress={() => this.props.ftueTeams('baseball')}
									style={{ height: 40, marginVertical: 10 }}
									underlayColor='transparent'>
									<View style={styles.select}>
										<View style={{ flex: 1 }} />
										<View style={{ flex: 2 }} >
											<Text style={styles.sport}>Baseball</Text>
										</View>
										<View style={{ flex: 1 }} />
									</View>
								</TouchableHighlight>
							)} />
					</View>

					<View style={styles.back}>
						{/* Back */}
						<TouchableHighlight
							onPress={this.props.goBack}
							style={{ backgroundColor: '#31da5b', borderRadius: 5, padding: 10 }}
							underlayColor='#31da5b'>
							<Text style={styles.sport}>Back</Text>
						</TouchableHighlight>
					</View>

				</View>
			</View >
		);
	}
}

const mapStateToProps = (state, props) => ({
	sport: props.navigation.state.params.sport,
	teams: state.sports[props.navigation.state.params.sport]
});

const mapDispatchToProps = dispatch => ({
	goBack: () => { dispatch({ type: 'FTUE_BACK' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);