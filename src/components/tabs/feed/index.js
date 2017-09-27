import React, { Component } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/SimpleLineIcons';

class Feed extends Component {
	static navigationOptions = {
		tabBarIcon: ({ tintColor }) => <Icon color={tintColor} name='clock' size={30} />
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
	// hockey: require('../../../../assets/images/hockey.png'),
	mma: require('../../../../assets/images/mma.png'),
	soccer: require('../../../../assets/images/soccer.png')
};

const mapStateToProps = state => ({
	mode: state.session
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);