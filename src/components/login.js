import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

class Login extends Component {
	componentDidMount() {
		console.log(this.props)
		console.log('mode', this.state);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<Text>
					L O G I N
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);