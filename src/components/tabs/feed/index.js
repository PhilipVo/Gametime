import React, { Component } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

import http from '../../../services/http.service';

class Feed extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name='clock' size={30} />
	};

	constructor(props) {
		super(props);
		this.state = { data: [] };
	}

	render() {
		return (
			<FlatList
				data={this.state.data}
				keyExtractor={(item, index) => `${index}`}
				renderItem={({ item }) => (
					<Image source={images[item.sport]} style={{ height: 120, marginBottom: 1 }}>

					</Image>
				)}
				style={{ flex: 1 }} />
		);
	}
}

const images = {
	baseball: require('../../../../assets/images/baseball.png'),
	basketball: require('../../../../assets/images/basketball.png'),
	football: require('../../../../assets/images/football.png'),
	hockey: require('../../../../assets/images/hockey.png'),
	mma: require('../../../../assets/images/mma.png'),
	nascar: require('../../../../assets/images/nascar.png'),
	soccer: require('../../../../assets/images/soccer.png')
};

export default connect()(Feed);