import React, { Component } from 'react';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

import http from '../../../services/http.service';

const styles = StyleSheet.create({
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
		this.state = { data: [] };
	}

	componentDidMount = () => {
		http.get('/api/games/get-my-games')
			.then(data => this.setState({ data: data }))
			.catch(error => console.log(error))
	}


	render() {
		return (
			<FlatList
				data={this.state.data}
				keyExtractor={(item, index) => `${index}`}
				renderItem={({ item }) => (
					<ImageBackground source={images[item.sport]} style={styles.row}>
						<View style={{ flex: 1 }}>
							<Text style={{ textAlign: 'center' }}>
								{
									item.home + (item.away && ' vs ' + item.away)
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
				)}
				style={{ flex: 1 }} />
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