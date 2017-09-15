import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Add extends Component {
	componentDidMount() {
		console.log(this.props)
		console.log('mode', this.state);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Text>
					A D D
        </Text>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	mode: state.session
});

const mapDispatchToProps = dispatch => ({
	setMode: mode => { dispatch({ type: 'SET_MODE', mode: mode }); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);