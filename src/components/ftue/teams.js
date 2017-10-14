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
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}

	componentDidMount() {
		const followed = http.get(`/api/teams/get-followed-teams-for-sport/${this.props.sport}`)
			.catch(error => { throw error });

		const unfollowed = http.get(`/api/teams/get-unfollowed-teams-for-sport/${this.props.sport}`)
			.catch(error => { throw error });

		Promise.all([followed, unfollowed])
			.then(data => {
				console.log(data)
				this.setState({ data: data[0].concat(data[1]) });
			}).catch(error => console.log(error))
	}

	toggleTeam = (item, index) => {
		if (item.name) http.post('/api/teams', JSON.stringify({
			sport: this.props.sport,
			team: item.name
		})).then(() => {
			const data = this.state.data.slice();
			data[index].teamName = item.name;
			delete data[index].name;
			this.setState({ data: data });
		}).catch(error => console.log(error));
		else if (item.teamName) http.delete('/api/teams', JSON.stringify({
			sport: this.props.sport,
			team: item.teamName
		})).then(() => {
			const data = this.state.data.slice();
			data[index].name = item.teamName;
			delete data[index].teamName;
			this.setState({ data: data });
		}).catch(error => console.log(error));
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
					<Text style={styles.lets}>
						{
							this.state.data.length === 1 ?
								`Select below to follow ${this.props.sport}` :
								`Let's select your ${this.props.sport} teams`
						}
					</Text>
				</View>


				{/* Body */}
				<View style={{ flex: 10 }}>
					<View style={{ flex: 9 }}>
						<FlatList
							data={this.state.data}
							keyExtractor={(item, index) => `${index}`}
							renderItem={({ item, index }) => (
								<TouchableHighlight
									onPress={() => this.toggleTeam(item, index)}
									style={{ height: 40, marginVertical: 7 }}
									underlayColor='transparent'>
									<View style={styles.select}>
										<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
											<Icon color='white' name={item.teamName ? 'check-square-o' : 'square-o'} size={20} />
										</View>
										<View style={{ flex: 3 }} >
											<Text style={styles.sport}>{item.teamName ? item.teamName : item.name}</Text>
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
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Icon color='white' name='angle-left' size={20} />
								<Text style={styles.sport}> Back</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>

			</View >
		);
	}
}

const mapStateToProps = (state, props) => ({
	sport: props.navigation.state.params.sport,
});

const mapDispatchToProps = dispatch => ({
	goBack: () => { dispatch({ type: 'FTUE_BACK' }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);